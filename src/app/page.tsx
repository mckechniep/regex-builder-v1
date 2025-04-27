"use client";

import React, { useState, useEffect } from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // imported your Select

const CategoryExpander = ({ onExpand }: { onExpand: (expandedWords: string) => void }) => {
  const [categoryInput, setCategoryInput] = useState('');
  const [expandedResult, setExpandedResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExpand = async () => {
    setLoading(true);
    setError('');
    setExpandedResult('');
    try {
      const res = await fetch('/api/expand-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: categoryInput }),
      });

      if (!res.ok) {
        throw new Error('Failed to expand category.');
      }

      const data = await res.json();
      setExpandedResult(data.expanded);
    } catch (err) {
      setError('Expansion failed. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    onExpand(expandedResult);
    setExpandedResult('');
    setCategoryInput('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expand Category with AI</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="categoryInput">Enter Theme or Category</Label>
          <Input
            id="categoryInput"
            placeholder="e.g., fruits, emotions, fitness"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
        </div>
        <Button onClick={handleExpand} disabled={loading}>
          {loading ? "Expanding..." : "Expand Category"}
        </Button>

        {expandedResult && (
          <div className="grid gap-2 mt-4">
            <Label>Expanded Words/Phrases</Label>
            <Textarea
              value={expandedResult}
              readOnly
              className="h-32"
            />
            <Button variant="secondary" onClick={handleAccept}>
              Accept Expanded Words
            </Button>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};


const StandardRegexInput = ({ onRegexChange, words: externalWords }: { onRegexChange: (category: string, regex: string) => void, words: string }) => {
  const [category, setCategory] = useState('');
  const [words, setWords] = useState('');
  const [regex, setRegex] = useState('');
  const [patternType, setPatternType] = useState('word'); // new!

  useEffect(() => {
    if (externalWords) {
      setWords(externalWords);
    }
  }, [externalWords]);  

  const generateRegex = () => {
    const wordArray = words.split(',').map(word => word.trim()).filter(word => word !== '');
    let regexPattern = '';

    if (wordArray.length > 0) {
      if (patternType === 'emoji') {
        regexPattern = `(${wordArray.join('|')})`;
      } else {
        regexPattern = `\\b(${wordArray.join('|')})\\b`;
      }
    }

    setRegex(regexPattern);
    onRegexChange(category, regexPattern);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standard Regex Input</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="fruits"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="words">Matching Words/Phrases</Label>
          <Textarea
            id="words"
            placeholder="apple, banana, cherry"
            value={words}
            onChange={(e) => setWords(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="patternType">Pattern Type</Label>
          <Select value={patternType} onValueChange={(value) => setPatternType(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select pattern type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="word">Words/Phrases (with word boundaries)</SelectItem>
              <SelectItem value="emoji">Emoji (no word boundaries)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={generateRegex}>Generate Regex</Button>
        {regex && (
          <div className="grid gap-2">
            <Label>Regex Output</Label>
            <Input readOnly value={regex ? `r"${regex}"` : ''} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const VariableLookaheadInput = ({onRegexChange}: { onRegexChange: (category: string, regex: string) => void }) => {
  const [category, setCategory] = useState('');
  const [matchWord, setMatchWord] = useState('');
  const [charLength, setCharLength] = useState('150');
  const [triggerWords, setTriggerWords] = useState('');
  const [regex, setRegex] = useState('');

  const generateRegex = () => {
    const triggerWordArray = triggerWords.split(',').map(word => word.trim()).filter(word => word !== '');
    const regexPattern = triggerWordArray.length > 0 ? `\\b(${matchWord})\\b.{0,${charLength}}\\b(${triggerWordArray.join('|')})\\b` : '';
    setRegex(regexPattern);
    onRegexChange(category, regexPattern);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variable Look-Ahead Input</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="category">Category Name</Label>
          <Input
            id="category"
            placeholder="fruit_mentions"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="matchWord">Anchor Words</Label>
          <Input
            id="matchWord"
            placeholder="apple, banana, cherry"
            value={matchWord}
            onChange={(e) => setMatchWord(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="charLength">Character Length (0-150)</Label>
          <Input
            id="charLength"
            type="number"
            min="0"
            max="150"
            value={charLength}
            onChange={(e) => setCharLength(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="triggerWords">Trigger Words/Phrases</Label>
          <Textarea
            id="triggerWords"
            placeholder="ripe, juicy, fresh, organic, sweet, picked from the farm"
            value={triggerWords}
            onChange={(e) => setTriggerWords(e.target.value)}
          />
        </div>
        <Button onClick={generateRegex}>Generate Regex</Button>
        {regex && (
          <div className="grid gap-2">
            <Label>Regex Output</Label>
            <Input readOnly value={regex ? `r"${regex}"` : ''}/>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const VariableLookbehindInput = ({onRegexChange}: { onRegexChange: (category: string, regex: string) => void }) => {
  const [category, setCategory] = useState('');
  const [matchWord, setMatchWord] = useState('');
  const [charLength, setCharLength] = useState('150');
  const [triggerWords, setTriggerWords] = useState('');
  const [regex, setRegex] = useState('');

  const generateRegex = () => {
    const triggerWordArray = triggerWords.split(',').map(word => word.trim()).filter(word => word !== '');
    const regexPattern = triggerWordArray.length > 0 ? `\\b(${triggerWordArray.join('|')})\\b.{0,${charLength}}\\b(${matchWord})\\b` : '';
    setRegex(regexPattern);
    onRegexChange(category, regexPattern);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variable Look-Behind Input</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="category">Category Name</Label>
          <Input
            id="category"
            placeholder="vegetable_mentions"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="matchWord">Anchor Words</Label>
          <Input
            id="matchWord"
            placeholder="onion, mushroom, carrot"
            value={matchWord}
            onChange={(e) => setMatchWord(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="charLength">Character Length (0-150)</Label>
          <Input
            id="charLength"
            type="number"
            min="0"
            max="150"
            value={charLength}
            onChange={(e) => setCharLength(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="triggerWords">Trigger Words/Phrases</Label>
          <Textarea
            id="triggerWords"
            placeholder="chopped, steamed, grilled, frozen, organic, roasted"
            value={triggerWords}
            onChange={(e) => setTriggerWords(e.target.value)}
          />
        </div>
        <Button onClick={generateRegex}>Generate Regex</Button>
        {regex && (
          <div className="grid gap-2">
            <Label>Regex Output</Label>
            <Input readOnly value={regex ? `r"${regex}"` : ''}/>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Home: React.FC = () => {
  // Changed from string to object to track the actual dictionary structure
  const [dictionary, setDictionary] = useState<{[key: string]: string[]}>({});
  const [displayDictionary, setDisplayDictionary] = useState(''); // For display only
  const [standardWords, setStandardWords] = useState(''); 
  const [standardRegexes, setStandardRegexes] = useState<{[key: string]: string}>({});
  const [lookaheadRegexes, setLookaheadRegexes] = useState<{[key: string]: string}>({});
  const [lookbehindRegexes, setLookbehindRegexes] = useState<{[key: string]: string}>({});

  const handleStandardRegexChange = (category: string, regex: string) => {
    setStandardRegexes(prev => ({...prev, [category]: regex}));
  };

  const handleLookaheadRegexChange = (category: string, regex: string) => {
    setLookaheadRegexes(prev => ({...prev, [category]: regex}));
  };

  const handleLookbehindRegexChange = (category: string, regex: string) => {
    setLookbehindRegexes(prev => ({...prev, [category]: regex}));
  };

  // Update to add new patterns to the existing dictionary
  const handleGenerateDictionary = () => {
    // Create a copy of the current dictionary
    let updatedDictionary = {...dictionary};
    
    // Process standard regexes
    Object.keys(standardRegexes).forEach(category => {
      if (standardRegexes[category]) {
        // If category exists, add to it, otherwise create new array
        if (updatedDictionary[category]) {
          // Check if this pattern already exists to avoid duplicates
          if (!updatedDictionary[category].includes(standardRegexes[category])) {
            updatedDictionary[category] = [...updatedDictionary[category], standardRegexes[category]];
          }
        } else {
          updatedDictionary[category] = [standardRegexes[category]];
        }
      }
    });
    
    // Process lookahead regexes
    Object.keys(lookaheadRegexes).forEach(category => {
      if (lookaheadRegexes[category]) {
        if (updatedDictionary[category]) {
          if (!updatedDictionary[category].includes(lookaheadRegexes[category])) {
            updatedDictionary[category] = [...updatedDictionary[category], lookaheadRegexes[category]];
          }
        } else {
          updatedDictionary[category] = [lookaheadRegexes[category]];
        }
      }
    });
    
    // Process lookbehind regexes
    Object.keys(lookbehindRegexes).forEach(category => {
      if (lookbehindRegexes[category]) {
        if (updatedDictionary[category]) {
          if (!updatedDictionary[category].includes(lookbehindRegexes[category])) {
            updatedDictionary[category] = [...updatedDictionary[category], lookbehindRegexes[category]];
          }
        } else {
          updatedDictionary[category] = [lookbehindRegexes[category]];
        }
      }
    });
    
    // Update dictionary state
    setDictionary(updatedDictionary);
    
    // Create a Python-compatible representation for display
    let pythonDict = "{\n";
    Object.keys(updatedDictionary).forEach(category => {
      pythonDict += `  "${category}": [\n`;
      updatedDictionary[category].forEach((pattern, index) => {
        pythonDict += `    r"${pattern}"${index < updatedDictionary[category].length - 1 ? ',' : ''}\n`;
      });
      pythonDict += `  ],\n`;
    });
    pythonDict += "}";
    
    setDisplayDictionary(pythonDict);
    
    // Clear the inputs after adding to dictionary
    setStandardRegexes({});
    setLookaheadRegexes({});
    setLookbehindRegexes({});
  };

  // Reset dictionary function
  const handleResetDictionary = () => {
    setDictionary({});
    setDisplayDictionary('');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-primary">Regex Dictionary Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
        <CategoryExpander onExpand={(expandedWords) => setStandardWords(expandedWords)} />
        <StandardRegexInput onRegexChange={handleStandardRegexChange} words={standardWords} />
        <VariableLookaheadInput onRegexChange={handleLookaheadRegexChange} />
        <VariableLookbehindInput onRegexChange={handleLookbehindRegexChange} />
      </div>

      <div className="flex gap-4 mt-8">
        <Button onClick={handleGenerateDictionary}>
          Add to Dictionary
        </Button>
        <Button variant="destructive" onClick={handleResetDictionary}>
          Reset Dictionary
        </Button>
      </div>

      {displayDictionary && (
        <Card className="mt-8 w-full max-w-5xl">
          <CardHeader>
            <CardTitle>Generated Dictionary</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{displayDictionary}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
