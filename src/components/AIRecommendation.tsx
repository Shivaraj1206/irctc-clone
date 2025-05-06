
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface RecommendationResult {
  trainRoutes: {
    from: string;
    to: string;
    trainName: string;
    description: string;
  }[];
  explanation: string;
}

const FALLBACK_RECOMMENDATIONS: RecommendationResult = {
  trainRoutes: [
    {
      from: "Bengaluru",
      to: "Ooty",
      trainName: "Nilgiri Mountain Railway (Train No. 56136)",
      description: "This UNESCO World Heritage train offers breathtaking mountain views through the Western Ghats. Perfect for scenic photography in July with lush green landscapes after monsoon."
    },
    {
      from: "Chennai",
      to: "Pondicherry",
      trainName: "Chennai Puducherry Express (Train No. 16117)",
      description: "Combining coastal beauty with French colonial architecture in Pondicherry. July offers pleasant weather for exploring cultural sites and beaches."
    },
    {
      from: "Kochi",
      to: "Munnar",
      trainName: "Ernakulam-Madurai Express (Train No. 16731) + connecting taxi",
      description: "Experience Kerala's lush tea plantations and mountain vistas. The train journey followed by a scenic road trip provides diverse landscapes and cultural experiences."
    }
  ],
  explanation: "These routes offer the best combination of mountain scenery and cultural experiences in South India during July. The Nilgiri Railway is especially recommended for mountain enthusiasts, while the other routes balance natural beauty with historical sites."
};

const AIRecommendation = () => {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!prompt.trim()) {
      toast.error('Please enter your travel preferences');
      return;
    }
    
    if (!apiKey.trim()) {
      toast.error('Please enter your OpenAI API key');
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an AI travel assistant specializing in Indian train routes. 
              Analyze the user's preferences and suggest 3 train routes. 
              Return ONLY JSON in this format: 
              {
                "trainRoutes": [
                  {
                    "from": "City name",
                    "to": "City name",
                    "trainName": "Train name with number",
                    "description": "Short description of this route and why it matches preferences"
                  }
                ],
                "explanation": "Brief explanation of why these routes were chosen based on preferences"
              }`
            },
            {
              role: 'user',
              content: `Based on these preferences, suggest train routes in India: ${prompt}`
            }
          ],
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      
      try {
        const content = data.choices[0].message.content;
        const parsedContent = JSON.parse(content);
        setResult(parsedContent);
        setShowFallback(false);
        toast.success('AI recommendations generated successfully!');
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        toast.error('Failed to parse AI response');
        throw new Error('Failed to parse AI response');
      }
      
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate recommendations');
      
      // Check if it's a rate limit or quota error
      if (error instanceof Error && 
          (error.message.includes('429') || 
           error.message.includes('quota') || 
           error.message.includes('rate limit'))) {
        
        setShowFallback(true);
        setResult(FALLBACK_RECOMMENDATIONS);
        toast.info('Using demo recommendations due to API limits');
      } else {
        toast.error('Failed to generate recommendations. Please check your API key and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const useFallbackDemo = () => {
    setResult(FALLBACK_RECOMMENDATIONS);
    setShowFallback(true);
    toast.info('Using demo recommendations');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          <Sparkles className="inline-block mr-2 text-yellow-500" />
          AI-Powered Train Route Recommendations
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Get Personalized Train Suggestions</CardTitle>
            <CardDescription>
              Describe your travel preferences, interests, or constraints and our AI will recommend
              the best train routes for you.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>API Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Travel Preferences
                  </label>
                  <Textarea
                    id="prompt"
                    placeholder="Example: I'm looking for scenic train routes in South India for a 5-day trip in July. I enjoy mountain views and cultural sites."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
                    OpenAI API Key
                  </label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your OpenAI API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 mt-1">
                      Your API key is only used for this request and not stored.
                    </p>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-xs p-0 h-auto"
                      onClick={useFallbackDemo}
                    >
                      Use demo without API key
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Recommendations...
                  </>
                ) : (
                  'Generate AI Recommendations'
                )}
              </Button>
            </form>
          </CardContent>
          
          {result && (
            <CardFooter className="flex flex-col">
              <div className="border-t w-full pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-lg">Recommended Train Routes</h3>
                  {showFallback && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                      Demo Data
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{result.explanation}</p>
                
                <div className="space-y-4">
                  {result.trainRoutes.map((route, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{route.from} to {route.to}</span>
                        <span className="text-blue-600">{route.trainName}</span>
                      </div>
                      <p className="text-sm text-gray-600">{route.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AIRecommendation;
