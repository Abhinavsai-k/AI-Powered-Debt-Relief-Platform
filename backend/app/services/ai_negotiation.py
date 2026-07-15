import google.generativeai as genai
from sqlalchemy.orm import Session

from app.config import settings
from app.database.models import Loan, FinancialProfile

genai.configure(api_key=settings.GEMINI_API_KEY)


def _get_profile_and_loans(user_id, db):
    profile = db.query(FinancialProfile).filter(
        FinancialProfile.user_id == user_id
    ).first()

    loans = db.query(Loan).filter(
        Loan.user_id == user_id
    ).all()

    return profile, loans


def generate_strategy(user_id: int, db: Session):

    profile, loans = _get_profile_and_loans(user_id, db)

    if not profile or not loans:
        return {
            "success": False,
            "message": "Financial profile or loans not found."
        }

    prompt = f"""
You are a Debt Settlement Expert.

Monthly Income: {profile.monthly_income}
Monthly Expenses: {profile.monthly_expenses}
Savings: {profile.savings}
Credit Score: {profile.credit_score}

Loans:

{chr(10).join([
f"{loan.loan_type} | {loan.lender} | Balance ₹{loan.remaining_balance} | Interest {loan.interest_rate}% | Overdue {loan.overdue_months} months"
for loan in loans
])}

Generate a personalized debt settlement strategy.
"""

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)

        return {
            "success": True,
            "strategy": response.text
        }

    except Exception:

        return {
            "success": True,
            "strategy":
            "Fallback Strategy:\n"
            "- Pay high-interest loans first.\n"
            "- Negotiate overdue loans.\n"
            "- Increase monthly savings.\n"
            "- Reduce unnecessary expenses."
        }


def generate_letter(user_id: int, lender: str, db: Session):

    profile, loans = _get_profile_and_loans(user_id, db)

    if not profile:
        return {
            "success": False,
            "message": "Financial profile not found."
        }

    prompt = f"""
Write a professional debt settlement request letter.

Borrower Monthly Income:
₹{profile.monthly_income}

Monthly Expenses:
₹{profile.monthly_expenses}

Savings:
₹{profile.savings}

Lender:
{lender}

The tone should be professional and polite.
"""

    try:

        model = genai.GenerativeModel("gemini-2.5-flash")

        response = model.generate_content(prompt)

        return {
            "success": True,
            "letter": response.text
        }

    except Exception:

        return {
            "success": True,
            "letter": f"""
Subject: Debt Settlement Request

Dear {lender},

I am currently facing financial hardship.

I respectfully request consideration for a settlement on my outstanding loan.

I am committed to resolving my obligations and appreciate your support.

Thank you.

Sincerely,
FinRelief AI User
"""
        }