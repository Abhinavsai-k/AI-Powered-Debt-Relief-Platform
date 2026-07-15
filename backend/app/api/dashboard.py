from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.auth_dependency import get_current_user
from app.services.dashboard import dashboard_summary

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return dashboard_summary(
        current_user.id,
        db,
    )