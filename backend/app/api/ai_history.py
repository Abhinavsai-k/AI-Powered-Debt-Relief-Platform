from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import AIHistory
from app.core.auth_dependency import get_current_user

router = APIRouter(
    prefix="/ai-history",
    tags=["AI History"],
)


# ==================================================
# Get AI History
# ==================================================
@router.get("/")
def get_ai_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    history = (
        db.query(AIHistory)
        .filter(AIHistory.user_id == current_user.id)
        .order_by(AIHistory.generated_at.desc())
        .all()
    )

    return history