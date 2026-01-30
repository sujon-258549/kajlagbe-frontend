import { z } from "zod";

export const serviceItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  iconName: z.string().min(1, "Icon is required"),
  // image is actually not used in the grid display in Services.tsx, it's just a background gradient, wait..
  // Looking at the code:
  // <div className="absolute inset-0">
  //   <div className="absolute inset-0 z-0 bg-secondary" />
  //   <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10" />
  // </div>
  // The original servicesData HAS an image property: "https://img.freepik.com..."
  // But strictly looking at the JSX:
  // It renders:
  // <service.icon className="h-5 w-5" />
  // <Heading5 ...>{service.title}</Heading5>
  // It does NOT seem to use `service.image` in the provided code snippet of Services.tsx for the grid items I updated?
  // Let me re-read Services.tsx carefully.
  // Line 189: className="group relative h-[180px] w-full overflow-hidden rounded-xl bg-secondary border border-white/10 transition-colors"
  // ...
  // It seems the image IS NOT used in the current design I saw in step 1002. It just uses a background color and gradient.
  // HOWEVER, the `servicesData` array defined in the file HAS `image` property.
  // Maybe the user wants to bring images back or I should just keep it for future. Standard practice: keep it.
  image: z.string().optional(),
});

export const servicesSchema = z.object({
  services: z.array(serviceItemSchema),
});

export type ServiceItem = z.infer<typeof serviceItemSchema>;
export type ServicesFormData = z.infer<typeof servicesSchema>;
