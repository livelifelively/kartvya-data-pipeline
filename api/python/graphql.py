import httpx
import json

async def query_dgraph(query, variables=None):
    url = 'https://green-feather-41421553.ap-south-1.aws.cloud.dgraph.io/graphql'
    headers = {
        'Content-Type': 'application/json',
    }
    body = {
        'query': query,
        'variables': variables or {}
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=body)
    return response.json()