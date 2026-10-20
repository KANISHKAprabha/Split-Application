
import { describe, expect, it } from "vitest";
import { calculateEqualShare,calculateParticipantShares,createExpense } from "../src/expense";

describe("calculateEqualShare", () => {
  it("calculates an equal share", () => {
    expect(calculateEqualShare(90000, 3)).toEqual([30000,30000,30000]);
  });

  it("rejects zero participants", () => {
    expect(() => calculateEqualShare(90000, 0)).toThrow();
  });

  it("rejects a negative amount", () => {
    expect(() => calculateEqualShare(-500, 3)).toThrow();
  });
  it("Reject: amount must be an integer",()=>{
    expect(()=>calculateEqualShare(100.5,3)).toThrow();
  })
  it("Reject: participant count must be an integer",()=>{
    expect(()=>calculateEqualShare(100,3.2)).toThrow();
  })
  it("Reject: participant count must be positive",()=>{
    expect(()=>calculateEqualShare(-1,3)).toThrow();
  })
  it("reject  0 amount ",()=>{
    expect(()=>calculateEqualShare(0,3)).toThrow();
  })
  it("distrubutes leftover paisa",()=>{
    expect(calculateEqualShare(1000,3)).toEqual([
        334,333,333
    ])
  })
  it("preserve total amount after spliting",()=>{
    const shares=calculateEqualShare(1000,3);
    const total=shares.reduce((sum,share)=>sum+share,0);
    expect(total).toBe(1000);
  })
  it("connect each user with correct amount",()=>{
    const res=calculateParticipantShares(1000,["u1","u2","u3"]);
    expect(res).toEqual([{userId:"u1",amount:334},
       {userId:"u2",amount:333},
       {userId:"u3",amount:333} 
    ])
  })
  it("reject empty list of participants",()=>{
    expect(()=>calculateParticipantShares(100,[])).toThrow()
  })
  it("reject same participants",()=>{
    expect(()=>calculateParticipantShares(100,["u1","u1"])).toThrow()
  })
  it("create a valid expense",()=>{
    const expense= {
        amount:10000,
        payerId:"anu",
        participantIds:["ravi"]
    }
    expect(createExpense(expense)).toEqual(
        expense)
  })
  it("rejects a blank payer ID",()=>{
    expect(()=>createExpense({
        amount:10000,
        payerId:" ",
        participantId:["ravi"]
    })).toThrow()
  });
  it("allows a payer who is not a participant", () => {
  const expense = {
    amount: 10000,
    payerId: "anu",
    participantIds: ["ravi"],
  };

  expect(createExpense(expense)).toEqual(expense);
});
it("rejects a blank participant ID",()=>{
    expect(()=>createExpense({
        amount:10000,
        payerId:"anu",
        participantId:[" "]
    })).toThrow()
  });

});
