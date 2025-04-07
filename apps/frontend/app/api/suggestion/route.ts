import { NextRequest } from "next/server";

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    
    if (!query) {
      return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      const response = await fetch(
        `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encodeURIComponent(query)}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': '*/*'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API returned ${response.status}`);
      }
      
      const textContent = await response.text();
      
      let data;
      
      try {
        data = JSON.parse(textContent);
      } catch (e) {
        const match = textContent.match(/\((.+)\)/);
        if (match && match[1]) {
          data = JSON.parse(match[1]);
        } else {
          throw new Error('Unable to parse response');
        }
      }
      if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
        return new Response(JSON.stringify(data[1]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('YouTube suggestions error:', error);
      return new Response(JSON.stringify({ error: error.message || 'Failed to fetch suggestions' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }