from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine
from app.database import models

from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.profile import router as profile_router
from app.api.loans import router as loans_router
from app.api.financial_profile import router as financial_profile_router
from app.api.financial_engine import router as financial_engine_router
from app.api.dashboard import router as dashboard_router
from app.api.loan_analysis import router as loan_analysis_router
from app.api.settlement_routes import router as settlement_router
from app.api.ai_negotiation import router as ai_negotiation_router
from app.api.ai_history import router as ai_history_router
from app.api.ai_chat import router as ai_chat_router
from app.api.rights import router as rights_router

# Create Database Tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FinRelief AI Pro",
    version="3.0.0",
    description="AI-powered Debt Relief & Financial Recovery Platform with Financial Analysis, Settlement Prediction, and AI Negotiation.",
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-powered-debt-relief-platform.vercel.app",
        "https://ai-powered-debt-relief-platform-ryo-five.vercel.app",
        "https://ai-powered-debt-relief-platform-cgj9qxsbj-abhinavsai.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------
# Register Routers
# -----------------------------
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(profile_router)
app.include_router(loans_router)
app.include_router(financial_profile_router)
app.include_router(financial_engine_router)
app.include_router(dashboard_router)
app.include_router(loan_analysis_router)
app.include_router(settlement_router)
app.include_router(ai_negotiation_router)
app.include_router(ai_history_router)
app.include_router(ai_chat_router)
app.include_router(rights_router)

# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def root():
    return {
        "success": True,
        "application": "FinRelief AI Pro",
        "version": "3.0.0",
        "developer": "Abhinav Sai Karri",
        "message": "Backend running successfully 🚀",
    }
