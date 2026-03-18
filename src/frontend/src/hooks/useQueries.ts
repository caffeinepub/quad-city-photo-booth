import { useMutation } from "@tanstack/react-query";
import { EventType } from "../backend";
import { useActor } from "./useActor";

export interface InquiryForm {
  name: string;
  email: string;
  eventDate: string;
  eventType: EventType;
  guests: number;
  message: string;
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (form: InquiryForm) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(
        form.name,
        form.email,
        form.eventDate,
        form.eventType,
        BigInt(form.guests),
        form.message,
      );
    },
  });
}

export { EventType };
