import { Button, Select } from 'antd';
import { FC, useMemo, useRef, useState } from 'react';
import domo from 'ryuu.js';

import bookshelf from '/static/bookshelf.jpeg';
import chapterDivider from '/static/chapter_divider.png';

import styles from './App.module.scss';

const userPrompt = `Please generate a list of book recommendations based on the user's preferences.`;

const systemPrompt = `
You are a helpful, well-read literary assistant who gives thoughtful book recommendations.

The user will provide:
- A list of their favorite books (including author names if available)
- The genre(s) they're interested in
- The mood or tone they're looking for (e.g., uplifting, dark, relaxing, intense)
- Their preferred book length (e.g., short reads, medium, long epics)

Your task is to analyze the user's preferences and recommend **4 books** that:
- Match their genre, mood, and length preferences
- Share themes, tone, writing style, or emotional resonance with their favorite books
- Are not already listed in their favorites

For each recommendation, include:
- Title
- Author
- 1-2 sentence explanation of why it was chosen, referencing the user's input

Prioritize well-reviewed books, lesser-known gems, and avoid overly generic picks unless they are a perfect match.

If a user gives few inputs, do your best to infer recommendations from what's provided.

**Output format:**

Please return a JSON array of objects, each containing:
- "title": The title of the book
- "author": The author of the book
- "reason": A brief explanation of why this book was recommended

Do not include any additional text or explanations outside of this JSON format.`;

const genres = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'biography', label: 'Biography' },
  { value: 'business', label: 'Business' },
  { value: 'children', label: 'Children' },
  { value: 'classics', label: 'Classics' },
  { value: 'comics', label: 'Comics' },
  { value: 'cookbooks', label: 'Cookbooks' },
  { value: 'dystopian', label: 'Dystopian' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'fiction', label: 'Fiction' },
  { value: 'graphic-novel', label: 'Graphic Novel' },
  { value: 'health', label: 'Health' },
  { value: 'historical', label: 'Historical' },
  { value: 'horror', label: 'Horror' },
  { value: 'memoir', label: 'Memoir' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'non-fiction', label: 'Non-Fiction' },
  { value: 'philosophy', label: 'Philosophy' },
  { value: 'poetry', label: 'Poetry' },
  { value: 'romance', label: 'Romance' },
  { value: 'science-fiction', label: 'Science Fiction' },
  { value: 'self-help', label: 'Self-Help' },
  { value: 'spirituality', label: 'Spirituality' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'travel', label: 'Travel' },
  { value: 'true-crime', label: 'True Crime' },
  { value: 'young-adult', label: 'Young Adult' },
];

const moods = [
  { value: 'adventurous', label: 'Adventurous' },
  { value: 'dark', label: 'Dark' },
  { value: 'funny', label: 'Funny' },
  { value: 'happy', label: 'Happy' },
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'intense', label: 'Intense' },
  { value: 'mysterious', label: 'Mysterious' },
  { value: 'nostalgic', label: 'Nostalgic' },
  { value: 'reflective', label: 'Reflective' },
  { value: 'relaxing', label: 'Relaxing' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'sad', label: 'Sad' },
  { value: 'suspenseful', label: 'Suspenseful' },
  { value: 'thought-provoking', label: 'Thought-Provoking' },
  { value: 'uplifting', label: 'Uplifting' },
  { value: 'whimsical', label: 'Whimsical' },
];

const bookLengths = [
  { value: 'short', label: 'Short (Less than 200 pages)' },
  { value: 'medium', label: 'Medium (200-400 pages)' },
  { value: 'long', label: 'Long (More than 400 pages)' },
  { value: 'epic', label: 'Epic (More than 600 pages)' },
  { value: 'novella', label: 'Novella (50-100 pages)' },
  { value: 'series', label: 'Series (Multiple books)' },
];

interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
}

interface Recommendation {
  title: string;
  author: string;
  reason: string;
}

export const App: FC = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<OpenLibraryBook[]>([]);
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [mood, setMood] = useState<string | undefined>(undefined);
  const [bookLength, setBookLength] = useState<string | undefined>(undefined);

  const [allBooks, setAllBooks] = useState<OpenLibraryBook[]>([]);
  const [matchingBooks, setMatchingBooks] = useState<OpenLibraryBook[]>([]);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [bookSearchLoading, setBookSearchLoading] = useState(false);

  const bookOptions = useMemo(
    () =>
      matchingBooks.map((book) => ({
        value: book.key,
        label: `${book.title}, ${book.author_name?.join(', ') || 'Unknown Author'}`,
      })),
    [matchingBooks],
  );

  const fetchBooks = async (query: string): Promise<OpenLibraryBook[]> => {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.docs;
  };

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onBookSearch = (value: string) => {
    setBookSearchQuery(value);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    if (!value.trim()) {
      setMatchingBooks([]);
      setBookSearchLoading(false);
      return;
    }
    setBookSearchLoading(true);
    debounceTimer.current = setTimeout(() => {
      void (async () => {
        const fetchedBooks = await fetchBooks(value);
        setMatchingBooks(fetchedBooks);
        setAllBooks((prevBooks) => [
          ...prevBooks,
          ...fetchedBooks.filter(
            (newBook) => !prevBooks.some((book) => book.key === newBook.key),
          ),
        ]);
        setBookSearchLoading(false);
      })();
    }, 300);
  };

  const onBookChange = (value: string[]) => {
    const selectedBooks = allBooks.filter((book) => value.includes(book.key));
    setFavoriteBooks(selectedBooks);
  };

  const getBookRecommendations = async (
    books: OpenLibraryBook[],
    genre: string | undefined,
    mood: string | undefined,
    bookLength: string | undefined,
  ): Promise<Recommendation[]> => {
    try {
      const bookInfo = books
        .map(
          (book) =>
            `**${book.title}** by ${book.author_name?.join(', ') || 'Unknown Author'}`,
        )
        .join(', ');

      const body = {
        input: `Favorite Books: ${bookInfo}, Genre: ${genre || 'Any'}, Mood: ${
          mood || 'Any'
        }, Length: ${bookLength || 'Any'}`,
        promptTemplate: {
          template: `${userPrompt} \`\`\`\${input}\`\`\``,
        },
        system: systemPrompt,
        outputWordLength: {
          max: 400,
        },
      };

      const data = (await domo.post(`/domo/ai/v1/text/generation`, body)) as {
        choices: { output: string }[];
      };
      const output = data.choices[0].output;
      const cleaned = output
        .replace(/^\s*```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/i, '')
        .trim();
      return JSON.parse(cleaned) as Recommendation[];
    } catch (error) {
      console.error('Error processing chunk:', error);
      return [];
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    const recs = await getBookRecommendations(
      favoriteBooks,
      genre,
      mood,
      bookLength,
    );
    setRecommendations(recs);
    setLoading(false);
  };

  return (
    <div
      className={styles.app}
      style={{
        background: `url(${bookshelf}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <div className={styles.content}>
        {recommendations.length === 0 ? (
          <>
            <div className={styles.heading}>
              <h1>Chapter One</h1>
              <h2>Find your next favorite book</h2>
              <img
                style={{ marginTop: '30px' }}
                src={chapterDivider}
                width="40%"
                alt="divider"
              />
            </div>
            <div className={styles.form}>
              <Select
                mode="multiple"
                autoClearSearchValue
                filterOption={false}
                allowClear
                placeholder="Choose your favorite books"
                options={bookOptions}
                value={favoriteBooks.map((book) => book.key)}
                onSearch={onBookSearch}
                onChange={onBookChange}
                notFoundContent={
                  bookSearchLoading
                    ? 'Searching…'
                    : bookSearchQuery.trim()
                      ? 'No books found'
                      : 'Start typing a book title to search'
                }
                style={{ flex: 1 }}
              />
            </div>
            <div className={styles.form}>
              <Select
                placeholder="Select a genre"
                value={genre}
                onChange={(value) => setGenre(value)}
                options={genres}
                style={{ flex: 1 }}
              />
              <Select
                placeholder="Select a mood"
                value={mood}
                onChange={(value) => setMood(value)}
                options={moods}
                style={{ flex: 1 }}
              />
              <Select
                placeholder="Select a book length"
                value={bookLength}
                onChange={(value) => setBookLength(value)}
                options={bookLengths}
                style={{ flex: 1 }}
              />
            </div>
            <Button onClick={onSubmit} loading={loading}>
              Get Recommendations
            </Button>
          </>
        ) : (
          <div>
            <h1>Recommended Books</h1>
            <div className={styles.bookList}>
              {recommendations.map((rec, index) => (
                <div key={index} className={styles.bookItem}>
                  <h4>{rec.title}</h4>
                  <p className={styles.author}>{rec.author}</p>
                  <p className={styles.reason}>{rec.reason}</p>
                </div>
              ))}
            </div>
            <div className={styles.actions}>
              <Button onClick={() => setRecommendations([])}>
                Edit preferences
              </Button>
              <Button type="primary" onClick={onSubmit} loading={loading}>
                Try again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
