"use client";

import React, {useState} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";

const StandardRegexInput = ({onRegexChange}: { onRegexChange: (category: string, regex: string) => void }) => {
  const [category, setCategory] = useState('');
  const [words, setWords] = useState('');
  const [regex, setRegex] = useState('');

  const generateRegex = () => {
    const wordArray = words.split(',').map(word => word.trim()).filter(word => word !== '');
    const regexPattern = wordArray.length > 0 ? `\\b(${wordArray.map(word => word).join('|')})\\b` : '';
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
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="matchWord">Matching Word/Phrase</Label>
          <Input
            id="matchWord"
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
            placeholder="aa, sobriety, recovery"
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
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="matchWord">Matching Word/Phrase</Label>
          <Input
            id="matchWord"
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
            placeholder="aa, sobriety, recovery"
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
  const [dictionary, setDictionary] = useState('');
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

  const handleGenerateDictionary = () => {
    let combinedDictionary: {[key: string]: string[]} = {};

    // Process standard regexes
    Object.keys(standardRegexes).forEach(category => {
      combinedDictionary[category] = [`${standardRegexes[category]}`];
    });

    // Process lookahead regexes
    Object.keys(lookaheadRegexes).forEach(category => {
      combinedDictionary[category] = [`${lookaheadRegexes[category]}`];
    });

    // Process lookbehind regexes
    Object.keys(lookbehindRegexes).forEach(category => {
      combinedDictionary[category] = [`${lookbehindRegexes[category]}`];
    });

    setDictionary(JSON.stringify(combinedDictionary, null, 2));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-primary">Regex Dictionary Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
        <StandardRegexInput onRegexChange={handleStandardRegexChange} />
        <VariableLookaheadInput onRegexChange={handleLookaheadRegexChange} />
        <VariableLookbehindInput onRegexChange={handleLookbehindRegexChange} />
      </div>

      <Button className="mt-8" onClick={handleGenerateDictionary}>
        Generate Dictionary
      </Button>

      {dictionary && (
        <Card className="mt-8 w-full max-w-5xl">
          <CardHeader>
            <CardTitle>Generated Dictionary</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{dictionary}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
