export type ParticipantShare={
    userId:string,
    amount:number;
}
export type Expense={
    amount:number,
    payerId:string,
    participantIds:string[];
}
export function calculateEqualShare(
  amount: number,
  participantCount: number
): number[] {
  if (
    !Number.isInteger(participantCount) ||
    participantCount <= 0
  ) {
    throw new Error(
      "Participant count must be a positive integer"
    );
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error(
      "Amount must be a non-negative integer"
    );
  }
  
  const baseShare=Math.floor(amount/participantCount)
  const remainder=amount%participantCount
  const shares=Array(participantCount).fill(baseShare)
  for(let i=0;i<remainder;i++){
    shares[i]+=1;
  }
  return shares

  
}

export function calculateParticipantShares(
    amount:number,
    participantIds:string[]
):ParticipantShare[] {
    if(participantIds.length==0){
        throw new Error("Atleast one partiicpant required")
    }
    if(new Set(participantIds).size!=participantIds.length){
        throw new Error("Duplicate participant IDs are not allowed")
    }
    const share=calculateEqualShare(amount,participantIds.length);
    return participantIds.map((userId,index)=>({
        userId,
        amount:share[index]
    }));
}


export function createExpense(expense:Expense):Expense{
    if(expense.payerId.trim()===""){
        throw new Error("PayerId is required");
    }
    if(expense.participantIds.length===0){
       throw new Error("Atleast one participant is required") 
    }
    if(new Set(expense.participantIds).size!=expense.participantIds.length){
        throw new Error("Duplicate participant IDs are not allowed");
    }
    if(expense.participantIds.some((id)=>id.trim()==="")){
        throw new Error("Participant Id are not blank");
    }
    calculateEqualShare(expense.amount,expense.participantIds.length)
    return expense;
}