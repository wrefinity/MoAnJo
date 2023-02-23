"""
This class defines the order database model
"""
import uuid
from . import db
from .abc import BaseModel, MetaBaseModel
from datetime import datetime


class Oder(db.Model, BaseModel, MetaBaseModel):
    """
    The Oder model class
    """

    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    tax = db.Column(db.Float, nullable=False)
    total_cost = db.Column(db.Float, nullable=False)
    delivery_status = db.Column(db.Boolean, nullable=False, default=False)
    delivered_at = db.Column(db.DateTime, nullable=False)

    #Foreign key

    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"), nullable=False)



