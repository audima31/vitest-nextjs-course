'use client'

import { useState } from 'react'
import Card from "@/components/Card/Card";
import ThemedButton from "@/components/ThemedButton/ThemedButton";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="homepage">
      <section className="homepage-section homepage-header-section">
        <header className="homepage-header">
          <h1>Welcome to Readle</h1>
          <p>Your personal space for tracking and organizing your favorite books</p>
        </header>
      </section>

      <section className="homepage-section homepage-features-section">
        <ul className="homepage-features pb-8" aria-label="features">
          <li>
            <Card link="/books">
              <h2>Build Your Library</h2>
              <p>Create and manage your personal reading collection with ease.</p>
            </Card>
          </li>
          <li>
            <Card link="/books">
              <h2>Track Your Progress</h2>
              <p>Keep notes and mark books as read or currently reading.</p>
            </Card>
          </li>
          <li>
            <Card link="/books">
              <h2>Discover & Share</h2>
              <p>Find your next great read and share recommendations.</p>
            </Card>
          </li>
        </ul>

        {isExpanded && (
          <ul className="homepage-features pb-8" aria-label="more features">
            <li>
              <Card>
                <h2>Premium Tools</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </Card>
            </li>
            <li>
              <Card>
                <h2>Reading Suggestions</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              </Card>
            </li>
            <li>
              <Card>
                <h2>Bookmarks</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </Card>
            </li>
          </ul>
        )}

        <div className="text-center">
          <ThemedButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </ThemedButton>
        </div>
      </section>

      <section className="homepage-section homepage-actions-section">
        <div className="homepage-actions">
          <h2>Ready to start your reading journey?</h2>
          <p>Join thousands of readers who are organizing their libraries and discovering new books every day.</p>
          <div className="homepage-actions-buttons">
            <ThemedButton>Get Started</ThemedButton>
            <ThemedButton variant="secondary">Browse Books</ThemedButton>
          </div>
        </div>
      </section>

    </div>
  )
}
