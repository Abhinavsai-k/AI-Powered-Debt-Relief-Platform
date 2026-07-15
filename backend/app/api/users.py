from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.database.database import get_db
from app.database.models import User
from app.models.schemas import UserCreate, UserUpdate

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# Create User
@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        new_user = User(
            name=user.name,
            email=user.email,
            password=hash_password(user.password),
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "success": True,
            "message": "User created successfully",
            "user_id": new_user.id,
        }

    except Exception as e:
        db.rollback()

        print("=" * 60)
        print("USER CREATION ERROR")
        print(type(e).__name__)
        print(str(e))
        print("=" * 60)

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

# Get All Users
@router.get("/")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "created_at": user.created_at,
        }
        for user in users
    ]


# Get User By ID
@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
    "id": user.id,
    "name": user.name,
    "email": user.email,
    "created_at": user.created_at,
}
# Update User
@router.put("/{user_id}")
def update_user(
    user_id: int,
    updated_user: UserUpdate,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.name = updated_user.name
    user.email = updated_user.email
    user.password = hash_password(updated_user.password)

    db.commit()
    db.refresh(user)

    return {
        "message": "User updated successfully",
        "user": user
    }


# Delete User
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }