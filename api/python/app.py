from fastapi import FastAPI
from graphql import query_dgraph
import json

app = FastAPI()

@app.get("/hello")
async def read_root():
    return {"Hello": "World"}

@app.get("/")
async def read_root():
    query = """
      query {
        queryRegionName (filter: {name: {eq: "anantnag"}}) {
            name_of {
                category
                id
            }
        }
      }
    """
    result = await query_dgraph(query)
    return json.dumps(result)