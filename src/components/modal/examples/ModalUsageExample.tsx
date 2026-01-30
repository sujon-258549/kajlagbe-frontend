"use client";

import React, { useState } from "react";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import CommonModal from "@/components/modal/common/CommonModal";

/**
 * Examples of how to use the CommonModal component with custom fields and different configurations.
 */
export default function ModalUsageExample() {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div className="p-10 space-x-4">
      {/* 1. Basic Modal */}
      <Button onClick={() => setIsBasicOpen(true)}>Basic Modal</Button>
      <CommonModal
        isOpen={isBasicOpen}
        onClose={() => setIsBasicOpen(false)}
        title="Basic Information"
        description="This is a simple modal with just some text and a title."
      >
        <div className="py-4">
          <p className="text-slate-600">
            You can put any content here. It&apos;s completely reusable across
            the whole project.
          </p>
        </div>
      </CommonModal>

      {/* 2. Modal with Image and Form Inputs */}
      <Button onClick={() => setIsImageOpen(true)}>
        Modal with Image & Inputs
      </Button>
      <CommonModal
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        title="Profile Settings"
        description="Update your profile information and upload a new avatar."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
        maxWidth="xl"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsImageOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-secondary hover:bg-secondary/90 text-white">
              Save Changes
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="First Name" placeholder="Enter first name" />
          <FormInput label="Last Name" placeholder="Enter last name" />
          <FormInput
            label="Email Address"
            placeholder="example@mail.com"
            containerClassName="md:col-span-2"
          />
        </div>
      </CommonModal>

      {/* 3. Fully Custom Content Modal */}
      <Button onClick={() => setIsFormOpen(true)}>Custom Field Modal</Button>
      <CommonModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Create New Project"
        description="Fill in the details below to start your next big adventure."
        maxWidth="2xl"
      >
        <form className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <h4 className="font-bold text-secondary mb-4">Project Details</h4>
            <div className="space-y-4">
              <FormInput
                label="Project Name"
                placeholder="e.g. Kajlagbe Website"
              />
              <FormInput label="Budget" placeholder="$0.00" type="number" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Project Description
            </label>
            <textarea
              className="w-full min-h-[120px] rounded-2xl border border-slate-200 p-4 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
              placeholder="Tell us more about the project..."
            />
          </div>

          <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold">
            Launch Project
          </Button>
        </form>
      </CommonModal>
    </div>
  );
}
