from pydantic import BaseModel, EmailStr, Field

# ==================================================
# User Schemas
# ==================================================
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    name: str
    email: EmailStr
    password: str


# ==================================================
# Loan Schemas
# ==================================================
class LoanCreate(BaseModel):
    user_id: int

    loan_type: str = Field(..., min_length=2, max_length=100)

    lender: str = Field(..., min_length=2, max_length=100)

    amount: float = Field(..., gt=0)

    interest_rate: float = Field(..., ge=0, le=100)

    tenure: int = Field(..., gt=0)

    emi: float = Field(..., gt=0)

    overdue_months: int = Field(default=0, ge=0)

    remaining_balance: float = Field(..., ge=0)

    status: str = Field(default="Active")

class LoanUpdate(BaseModel):
    loan_type: str = Field(..., min_length=2, max_length=100)

    lender: str = Field(..., min_length=2, max_length=100)

    amount: float = Field(..., gt=0)

    interest_rate: float = Field(..., ge=0, le=100)

    tenure: int = Field(..., gt=0)

    emi: float = Field(..., gt=0)

    overdue_months: int = Field(default=0, ge=0)

    remaining_balance: float = Field(..., ge=0)

    status: str = Field(default="Active")


# ==================================================
# Financial Profile Schemas
# ==================================================
class FinancialProfileCreate(BaseModel):
    monthly_income: float
    monthly_expenses: float
    savings: float
    employment_type: str
    credit_score: int
    dependents: int
    
class FinancialProfileUpdate(BaseModel):
    monthly_income: float
    monthly_expenses: float
    savings: float
    employment_type: str
    credit_score: int
    dependents: int


# ==================================================
# Settlement Schemas
# ==================================================
class SettlementCreate(BaseModel):
    loan_id: int
    settlement_percentage: float
    predicted_amount: float
    eligibility: str
    status: str


class SettlementUpdate(BaseModel):
    settlement_percentage: float
    predicted_amount: float
    eligibility: str
    status: str


# ==================================================
# Financial Engine Schema
# ==================================================
class FinancialAnalysisRequest(BaseModel):
    user_id: int
   
 # ==================================================
# AI Negotiation Schema
# ==================================================

class AINegotiationRequest(BaseModel):
    user_id: int
    loan_id: int


 # ==================================================
# Login Schema
# ==================================================

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ==================================================
# Settlement Schemas
# ==================================================

from pydantic import BaseModel


class SettlementCreate(BaseModel):
    loan_id: int
    settlement_percentage: float
    predicted_amount: float
    eligibility: str
    status: str = "Pending"


class SettlementUpdate(BaseModel):
    settlement_percentage: float
    predicted_amount: float
    eligibility: str
    status: str


class SettlementResponse(BaseModel):
    id: int
    loan_id: int
    settlement_percentage: float
    predicted_amount: float
    eligibility: str
    status: str

    class Config:
        from_attributes = True