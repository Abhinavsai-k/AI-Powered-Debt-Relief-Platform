from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.auth_dependency import get_current_user
from app.services.ai_chat import chat_with_ai
router = APIRouter(
    prefix="/ai-chat",
    tags=["AI Chat Assistant"],
)


@router.post("/")
def ai_chat(
    payload: dict,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    message = payload.get("message", "")

    return chat_with_ai(
        user_id=current_user.id,
        message=message,
        db=db,
    )