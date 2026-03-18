import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type EventType = {
    #wedding;
    #corporate;
    #birthday;
    #festival;
    #other;
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    eventDate : Text;
    eventType : EventType;
    guests : Nat;
    message : Text;
  };

  var nextId = 1;
  let inquiries = Map.empty<Nat, Inquiry>();

  public shared ({ caller }) func submitInquiry(
    name : Text,
    email : Text,
    eventDate : Text,
    eventType : EventType,
    guests : Nat,
    message : Text,
  ) : async () {
    let inquiry : Inquiry = {
      id = nextId;
      name;
      email;
      eventDate;
      eventType;
      guests;
      message;
    };
    inquiries.add(nextId, inquiry);
    nextId += 1;
  };

  public query ({ caller }) func getInquiryById(id : Nat) : async Inquiry {
    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?inquiry) { inquiry };
    };
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };
};
