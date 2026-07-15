import google.generativeai as genai
from sqlalchemy.orm import Session

from app.config import settings
from app.database.models import Loan, FinancialProfile

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)


def chat_with_ai(user_id: int, message: str, db: Session):
    # Get user financial profile
    profile = (
        db.query(FinancialProfile)
        .filter(FinancialProfile.user_id == user_id)
        .first()
    )

    # Get all user loans
    loans = (
        db.query(Loan)
        .filter(Loan.user_id == user_id)
        .all()
    )

    profile_text = ""

    if profile:
        profile_text = f"""
Monthly Income: ₹{profile.monthly_income}
Monthly Expenses: ₹{profile.monthly_expenses}
Savings: ₹{profile.savings}
Employment: {profile.employment_type}
Credit Score: {profile.credit_score}
Dependents: {profile.dependents}
"""

    loan_text = ""

    if loans:
        for loan in loans:
            loan_text += f"""
Loan Type: {loan.loan_type}
Lender: {loan.lender}
Amount: ₹{loan.amount}
Remaining Balance: ₹{loan.remaining_balance}
Interest: {loan.interest_rate}%
Overdue Months: {loan.overdue_months}
Status: {loan.status}

"""

    prompt = f"""
You are FinRelief AI.

You are an expert financial advisor specializing in debt settlement and loan negotiations.

User Financial Profile:
{profile_text}

User Loans:
{loan_text}

User Question:
{message}

Give a professional answer.
Provide practical debt settlement suggestions where appropriate.
"""

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")

        response = model.generate_content(prompt)

        return {
            "reply": response.text
        }

    except Exception as e:
        print("=" * 60)
        print("GEMINI ERROR")
        print(str(e))
        print("=" * 60)

        return {
            "reply": f"AI Error: {str(e)}"
        }