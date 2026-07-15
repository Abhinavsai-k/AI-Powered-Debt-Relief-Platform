from fastapi import APIRouter, Depends

from app.core.auth_dependency import get_current_user

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


# ==================================================
# Get Current Logged-in User Profile
# ==================================================
@router.get("/me")
def get_profile(
    current_user=Depends(get_current_user),
):
    return {
        "success": True,
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
        },
    }