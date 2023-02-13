"""Authentication Resource"""
import sys
from flask import jsonify, abort
from flask_restful import Resource
from flask_restful.reqparse import Argument
from repositories import CustomerRepository, VerificationTokenRepository
from utils import parse_params, Notification
from utils.errors import DataNotFound, DuplicateData


class AuthResource(Resource):
    """ methods relative to the authorization """

    @staticmethod
    @parse_params(
        Argument("username", location="json",
                 help="The username/email of the customer."),
        Argument("password", location="json",
                 help="The password of the customer.")
    )
    def login(username, password):
        """ Login a customer"""

        try:
            customer = CustomerRepository.get(username=username)
            if not customer.check_password(password):
                abort(401, "Username or Password is incorrect")
            return jsonify({"data": customer.json})
        except DataNotFound:
            abort(401, "Username or Password is incorrect")
        except:
            abort(500)

    @staticmethod
    @parse_params(
        Argument("email", required=True, location="json",
                 help="The email of the customer."),
        Argument("username", required=True, location="json",
                 help="The username of the customer."),
        Argument("password", required=True, location="json",
                 help="The password of the customer."),
        Argument("first_name", required=True, location="json",
                 help="The first_name of the customer."),
        Argument("last_name", required=True, location="json",
                 help="The last_name of the customer."),
        Argument("phone", location="json"),
    )
    def register(email, password, username, first_name, last_name, confirm_url, phone=None):
        pass
