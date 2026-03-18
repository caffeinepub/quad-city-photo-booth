import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    guests: bigint;
    eventDate: string;
    eventType: EventType;
}
export enum EventType {
    other = "other",
    festival = "festival",
    wedding = "wedding",
    birthday = "birthday",
    corporate = "corporate"
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getInquiryById(id: bigint): Promise<Inquiry>;
    submitInquiry(name: string, email: string, eventDate: string, eventType: EventType, guests: bigint, message: string): Promise<void>;
}
