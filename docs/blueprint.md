# **App Name**: Regex Dictionary Builder

## Core Features:

- Standard Regex Input: Input fields for category names and matching words/phrases/emojis for standard regex patterns.
- Variable Lookaround Input: Input fields for category names, matching words/phrases, character length, and trigger words for variable lookahead/lookbehind regex patterns.
- Dictionary Generation & Display: Generates and displays the Python regex dictionary in JSON format, based on user inputs.

## Style Guidelines:

- Primary color: Dark blue (#1A237E) for a professional feel.
- Secondary color: Light gray (#F5F5F5) for backgrounds and subtle contrasts.
- Accent: Teal (#00BCD4) for interactive elements and highlights.
- Clean and readable sans-serif font for input fields and display areas.
- Clear separation of input sections for standard regex and variable lookaround patterns.
- Use icons to represent different regex components (e.g., word boundary, character range).

## Original User Request:
i want to create an app that creates a python regex dictionary, for the third-party python regex module (pip install regex). I want to be able to enter category words or phrases, and then enter the matching words, phrases or emojis.

you should be able to enter a word to match, say for example "fruits" and then enter any words that you want to match for fruits, say for example i entered "apple, apples, bobby, poop" and it return like this:

"fruits": [ r"\b(apples?|bobby|poop)\b" ],

and then the same for variable look ahead and variable look behind matches.

you should be able to enter a category-word or phrase, like say for look-ahead pattern, i enter "my_best_pal", and i want it to match for "tom" or "tommy", and then for 0 to 150 characters i want to match "aa" or "sobriety" or "recovery." so i specify the matching word, and then for how many characters, and then the words that trigger the match

then i would get a return like this: "my_best_pal": [ r"\b(tom(my)?.{0,150}(aa|sobriety|recovery)\b"
]

and the same for matching variable length look behind
  