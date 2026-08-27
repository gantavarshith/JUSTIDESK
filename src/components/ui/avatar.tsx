import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, src, ...props }, ref) => {
  const [resolvedSrc, setResolvedSrc] = React.useState<string | undefined>(typeof src === 'string' ? src : undefined);

  React.useEffect(() => {
    let active = true;
    const resolveSrc = async () => {
      try {
        if (typeof src === 'string' && src.startsWith('mock://avatar/')) {
          const id = src.replace('mock://avatar/', '');
          const raw = localStorage.getItem('mock_uploaded_avatars');
          if (raw) {
            const store = JSON.parse(raw);
            const dataUrl = store[id];
            if (active) setResolvedSrc(dataUrl || undefined);
            return;
          }
        }
      } catch (e) {
        // ignore
      }
      if (active) setResolvedSrc(typeof src === 'string' ? src : undefined);
    };

    resolveSrc();
    return () => { active = false; };
  }, [src]);

  return (
    <AvatarPrimitive.Image ref={ref} src={resolvedSrc} className={cn("aspect-square h-full w-full", className)} {...props} />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
