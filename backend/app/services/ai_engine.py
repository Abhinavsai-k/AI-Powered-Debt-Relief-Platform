"""
==================================================
FinRelief AI
Gemini AI Engine
==================================================
"""

import os
import google.generativeai as genai

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash")
else:
    model = None


# ==================================================
# Generic AI Response
# ==================================================

def generate_ai_response(prompt: str):

    if model is None:
        return {
            "success": False,
            "message": "Gemini API key not configured."
        }

    try:

        response = model.generate_content(prompt)

        return {
            "success": True,
            "response": response.text
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }


# ==================================================
# Financial Advisor
# ==================================================

def financial_advisor(data: dict):

    prompt = f"""
You are a professional financial advisor.

Analyze this user's financial condition.

Financial Score: {data['financial_score']}
Risk Level: {data['risk_level']}
Debt To Income Ratio: {data['debt_to_income_ratio']}%
Monthly Income: ₹{data['monthly_income']}
Monthly Expenses: ₹{data['monthly_expenses']}
Monthly Surplus: ₹{data['monthly_surplus']}
Savings: ₹{data['savings']}
Settlement Eligibility: {data['settlement_eligibility']}

Provide:

1. Overall financial health
2. Major risks
3. Debt repayment advice
4. Savings advice
5. Investment suggestion
6. Settlement recommendation (if needed)

Keep it professional and under 250 words.
"""

    return generate_ai_response(prompt)


# ==================================================
# Settlement Negotiation
# ==================================================

def settlement_negotiation(data: dict):

    prompt = f"""
Write a professional loan settlement negotiation message.

Lender: {data['lender']}
Outstanding Amount: ₹{data['remaining_balance']}
Settlement Offer: ₹{data['settlement_amount']}
Reason:
{data['reason']}

The tone should be polite, professional and persuasive.
"""

    return generate_ai_response(prompt)