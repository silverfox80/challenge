import { Publisher, Subjects, TicketUpdatedEvent } from "@s1lv3rf0x/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}