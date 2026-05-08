"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bell,
  Briefcase,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  FileText,
  Inbox,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSocket } from "@/context/SocketContext";
import { useAuth } from "@/context/AuthContext";
import {
  getMyNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/actions/notification.actions";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  userId: string;
  type?: string;
  message: string;
  jobId?: string | null;
  applicationId?: string | null;
  isRead: boolean;
  authorIsRead?: boolean;
  createdAt: string;
}

/**
 * Synth a short two-tone "tun" using Web Audio API.
 * Browsers block audio without prior user interaction — fail-soft.
 */
const playNotificationSound = () => {
  try {
    const AudioCtx =
      typeof window !== "undefined"
        ? window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext
        : undefined;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const beep = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + start);
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(0.18, now + start + 0.015);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + start + duration,
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.05);
    };

    // Two-note "tun" — higher then lower for a friendly chime
    beep(880, 0, 0.12);
    beep(660, 0.13, 0.18);

    setTimeout(() => ctx.close(), 600);
  } catch (err) {
    console.warn("[Notification] sound play failed:", err);
  }
};

const formatRelative = (iso: string) => {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
};

const iconForType = (type?: string) => {
  switch (type) {
    case "NEW_APPLICATION":
      return {
        Icon: FileText,
        color: "text-blue-600",
        bg: "bg-blue-50",
      };
    case "APPLICATION_ACCEPTED":
      return {
        Icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      };
    case "APPLICATION_REJECTED":
      return {
        Icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-50",
      };
    case "JOB":
      return {
        Icon: Briefcase,
        color: "text-secondary",
        bg: "bg-secondary/10",
      };
    default:
      return {
        Icon: Bell,
        color: "text-slate-500",
        bg: "bg-slate-100",
      };
  }
};

interface Props {
  buttonClassName?: string;
}

export default function NotificationDropdown({ buttonClassName }: Props) {
  const { user, isAuthenticated } = useAuth();
  const { socket } = useSocket();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.authorIsRead).length;

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await getMyNotifications({
        userId: user.id,
        limit: 30,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      if (res?.success) {
        const list: NotificationItem[] = Array.isArray(res.data)
          ? res.data
          : res.data?.data ?? [];
        setNotifications(list);
      }
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Initial fetch when authenticated
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchNotifications();
    }
  }, [isAuthenticated, user?.id, fetchNotifications]);

  // Realtime updates via socket
  useEffect(() => {
    if (!socket) return;
    const onNew = (notif: NotificationItem) => {
      setNotifications((prev) => [notif, ...prev]);
      playNotificationSound();
    };
    const onUpdate = (notif: NotificationItem) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, ...notif } : n)),
      );
    };
    const onSync = (
      payload?: { isRead?: boolean; authorIsRead?: boolean },
    ) => {
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: payload?.isRead ? true : n.isRead,
          authorIsRead: payload?.authorIsRead ? true : n.authorIsRead,
        })),
      );
    };

    socket.on("new-notification", onNew);
    socket.on("notification-updated", onUpdate);
    socket.on("notifications-read-sync", onSync);

    return () => {
      socket.off("new-notification", onNew);
      socket.off("notification-updated", onUpdate);
      socket.off("notifications-read-sync", onSync);
    };
  }, [socket]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;
    // optimistic
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, authorIsRead: true })),
    );
    const res = await markAllNotificationsRead();
    if (!res?.success) {
      fetchNotifications();
    }
  };

  const handleItemRead = async (id: string) => {
    const target = notifications.find((n) => n.id === id);
    if (!target || target.authorIsRead) return;
    // optimistic
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, authorIsRead: true } : n)),
    );
    const res = await markNotificationRead(id);
    if (!res?.success) {
      console.warn("[NotificationDropdown] mark-read failed:", res?.message);
      // revert by re-fetching from server
      fetchNotifications();
    } else if (res?.data) {
      // sync the row with server's authoritative copy
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...res.data } : n)),
      );
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "relative w-10 h-10 flex items-center justify-center rounded-full transition-colors text-secondary hover:bg-slate-100",
          buttonClassName,
        )}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-3 w-[360px] max-w-[90vw] bg-white rounded-xl border border-slate-200 z-50 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/40">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-secondary">
                  Notifications
                </h4>
                {unreadCount > 0 && (
                  <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
                className="flex items-center gap-1 text-[11px] font-bold text-secondary hover:text-secondary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            </div>

            {/* List */}
            <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-50">
              {loading && notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-semibold">
                  Loading...
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <Inbox className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-600">
                    No notifications yet
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    You&apos;re all caught up.
                  </p>
                </div>
              ) : (
                notifications.map((n) => {
                  const { Icon, color, bg } = iconForType(n.type);
                  const isUnread = !n.authorIsRead;
                  return (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => handleItemRead(n.id)}
                      className={cn(
                        "w-full text-left flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50/80 cursor-pointer",
                        isUnread && "bg-blue-50/40",
                      )}
                    >
                      <div
                        className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                          bg,
                        )}
                      >
                        <Icon className={cn("w-4 h-4", color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p
                            className={cn(
                              "text-[11px] uppercase tracking-wider",
                              isUnread
                                ? "font-bold text-secondary"
                                : "font-semibold text-slate-500",
                            )}
                          >
                            {(n.type || "NOTIFICATION").replace(/_/g, " ")}
                          </p>
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                          )}
                        </div>
                        <p
                          className={cn(
                            "text-xs leading-relaxed line-clamp-3",
                            isUnread ? "text-slate-700" : "text-slate-500",
                          )}
                        >
                          {n.message}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block font-semibold">
                          {formatRelative(n.createdAt)}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/40 text-center">
                <button
                  type="button"
                  onClick={fetchNotifications}
                  className="text-[11px] font-bold text-slate-500 hover:text-secondary transition-colors flex items-center gap-1 mx-auto"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                  Refresh
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
