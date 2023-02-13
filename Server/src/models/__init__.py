from .cart import Cart
from .product import Product
from .category import ProductCategory
from .customer import Customer
from .admin import Admin
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
