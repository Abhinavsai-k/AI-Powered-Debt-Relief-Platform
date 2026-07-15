from fastapi import APIRouter

router = APIRouter(
    prefix="/rights",
    tags=["Know Your Rights"],
)


@router.get("/")
def borrower_rights():
    return {
        "success": True,
        "rights": [
            {
                "title": "Right to Fair Treatment",
                "description": "Banks and recovery agents must treat borrowers respectfully and cannot harass or threaten them."
            },
            {
                "title": "Right to Request Settlement",
                "description": "Borrowers may request a One-Time Settlement (OTS) if they are facing genuine financial hardship."
            },
            {
                "title": "Right to Loan Information",
                "description": "You can request complete details of your outstanding balance, interest, charges, and payment history."
            },
            {
                "title": "Right to Privacy",
                "description": "Recovery agents cannot disclose your loan information to neighbors, relatives, or employers."
            },
            {
                "title": "Right to File Complaints",
                "description": "You may file complaints with your bank, RBI Ombudsman, or consumer forums if unfair practices occur."
            },
            {
                "title": "Right to Negotiate",
                "description": "You have the right to negotiate repayment plans or settlement terms with your lender."
            }
        ]
    }