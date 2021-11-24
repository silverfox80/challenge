import { Publisher, Subjects, TicketCreatedEvent } from "@s1lv3rf0x/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}