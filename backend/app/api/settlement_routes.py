from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.auth_dependency import get_current_user
from app.services.settlement_engine import predict_settlement

router = APIRouter(
    prefix="/settlements",
    tags=["Settlements"],
)


@router.get("/predict")
def settlement_prediction(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return predict_settlement(
        current_user.id,
        db,
    )