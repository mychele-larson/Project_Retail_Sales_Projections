from flask import Flask, render_template, jsonify
import sqlalchemy
import pandas as pd
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from math import ceil
from flask import request


app = Flask(__name__)

# Define a function to create a database engine
def create_db_engine():
    # Replace with your actual database credentials
    engine = sqlalchemy.create_engine(
        'postgresql://postgres:postgres@localhost:5432/model')
    return engine

# Call your function to create the engine
engine = create_db_engine()

# Create a session using the created engine
Session = sessionmaker(bind=engine)

@app.route('/api/v1.0/stores', methods=['GET'])
def get_stores():
    # Get query parameters for pagination
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 50))

    session = Session()
    try:
        # Execute the raw SQL query with pagination
        result_proxy = session.execute(text(f'SELECT * FROM stores OFFSET :offset LIMIT :limit'), {'offset': (page - 1) * per_page, 'limit': per_page})

        # Convert the result into a list of dictionaries
        stores = [dict(zip(result_proxy.keys(), row)) for row in result_proxy.fetchall()]

        # Get the total number of records
        total_records = session.execute(text('SELECT COUNT(*) FROM stores')).scalar()
        total_pages = ceil(total_records / per_page)

        # Return the paginated result as a JSON object
        return jsonify({
            'total_records': total_records,
            'total_pages': total_pages,
            'current_page': page,
            'per_page': per_page,
            'data': stores
        })
    finally:
        session.close()

@app.route('/api/v1.0/monthly_sales')
def monthly_sales():
    session = Session()
    try:
        # Retrieve the data from the database
        result_proxy = session.execute(text('SELECT * FROM monthly_sales'))

        # Convert the result into a list of dictionaries
        data = [dict(zip(result_proxy.keys(), row)) for row in result_proxy.fetchall()]

        # jsonify the data
        return jsonify(data)
    finally:
        session.close()

@app.route('/api/v1.0/yearly_sales')
def yearly_sales():
    session = Session()
    try:
        # Retrieve the data from the database
        result_proxy = session.execute(text('SELECT * FROM yearly_sales'))

        # Convert the result into a list of dictionaries
        data = [dict(zip(result_proxy.keys(), row)) for row in result_proxy.fetchall()]

        # jsonify the data
        return jsonify(data)
    finally:
        session.close()

@app.route('/api/v1.0/item_sales')
def item_sales():
    session = Session()
    try:
        # Retrieve the data from the database
        result_proxy = session.execute(text('SELECT * FROM item_sales'))

        # Convert the result into a list of dictionaries
        data = [dict(zip(result_proxy.keys(), row)) for row in result_proxy.fetchall()]

        # jsonify the data
        return jsonify(data)
    finally:
        session.close()

@app.route('/api/v1.0/weekday_sales')
def weekday_sales():
    session = Session()
    try:
        # Retrieve the data from the database
        result_proxy = session.execute(text('SELECT * FROM weekday_sales'))

        # Convert the result into a list of dictionaries
        data = [dict(zip(result_proxy.keys(), row)) for row in result_proxy.fetchall()]

        # jsonify the data
        return jsonify(data)
    finally:
        session.close()
        
@app.route('/api/v1.0/store_sales')
def store_sales():
    session = Session()
    try:
        # Retrieve the data from the database
        result_proxy = session.execute(text('SELECT * FROM store_sales'))

        # Convert the result into a list of dictionaries
        data = [dict(zip(result_proxy.keys(), row)) for row in result_proxy.fetchall()]

        # jsonify the data
        return jsonify(data)
    finally:
        session.close()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/data')
def data():
    return render_template('data.html')

@app.route('/model')
def model():
    return render_template('model.html')

@app.route('/results')
def results():
    return render_template('results.html')

@app.route('/model_training')
def model_training():
    return render_template('model_training.html')


if __name__ == '__main__':
    app.run(debug=True)

