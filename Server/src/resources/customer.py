"""Customer Resource"""
from flask import jsonify, abort
from flask_restful import Resource
from flask_restful.reqparse import Argument
from repositories import CustomerRepository
from utils import parse_params
from utils.errors import DataNotFound


class CustomerResource(Resource):
    """ Customer Resource Definition """

    @staticmethod
    def get_one(customer_id):
        """ get Customer Information """

        try:
            customer = CustomerRepository.get(customer_id=customer_id)
            if not customer:
                return jsonify({"message": f" customer with the id {customer_id} not found"})
            data = {
                "id": customer.id,
                "username": customer.username,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "email": customer.email,
                "phone": customer.phone,
                "country": customer.country,
                "state": customer.state,
                "city": customer.city,
                "street_name": customer.street_name,
                "zipcode": customer.zipcode,
            }
            return jsonify({"data": data})
        except DataNotFound as e:
            abort(404, e.message)
        except Exception:
            abort(500)

    @staticmethod
    def get_all():
        """ get all customers"""
        customers = CustomerRepository.getAll()
        return jsonify({"data": customers})

    @staticmethod
    @parse_params(
        Argument("first_name", location="json",
                 help="The first_name of the customer."),
        Argument("last_name", location="json",
                 help="The last_name of the customer."),
        Argument("phone", location="json",
                 help="The phone of the customer.")
    )
    def update_customer(customer_id, last_name, first_name, phone):
        """ Update a customer records"""
        customer = CustomerRepository().update(
            customer_id=customer_id, last_name=last_name, first_name=first_name, phone=phone
        )
        return jsonify({"data": customer.json})

    @staticmethod
    @parse_params(
        Argument("first_name", location="json", required=True,
                 help="The first_name of the customer."),
        Argument("last_name", location="json", required=True,
                 help="The last_name of the customer."),
        Argument("age", location="json", required=True,
                 help="The age of the customer.")
    )
    def post(username, last_name, first_name, phone, email, city,
             zipcode, street_name, password, state, country):
        """ Create a customer """
        # TODO: Check duplicates
        customer = CustomerRepository.create(
            username=username, last_name=last_name, first_name=first_name,
            phone=phone, email=email, city=city, state=state,
            zipcode=zipcode, street_name=street_name,
            password=password, country=country)
        return jsonify({"data": customer.json})
