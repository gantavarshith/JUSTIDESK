import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertTriangle, ArrowLeft, Quote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RightsCategoryCard } from '@/components/rights/RightsCategoryCard';
import { RightCard } from '@/components/rights/RightCard';
import { SituationHelper } from '@/components/situation/SituationHelper';
import { mockRightsCategories, justiceQuotes } from '@/data/mockData';
import { RightsCategory } from '@/types';

const KnowYourRights: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RightsCategory | null>(null);
  const [showSituationHelper, setShowSituationHelper] = useState(false);

  const filteredCategories = mockRightsCategories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.rights.some(
      (right) =>
        right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        right.explanation.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredRights = selectedCategory?.rights.filter(
    (right) =>
      right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      right.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quote = justiceQuotes[0];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        {selectedCategory && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedCategory(null)}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">
            {selectedCategory ? selectedCategory.title : 'Know Your Rights'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedCategory
              ? selectedCategory.description
              : 'Understand your legal rights in simple language'}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder={selectedCategory 
            ? `Search in ${selectedCategory.title}...` 
            : "Search by issue (police, landlord, workplace...)"
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 text-base"
        />
      </div>

      {/* Emergency Help Button */}
      <Card className="bg-gradient-to-r from-destructive/10 to-accent/10 border-destructive/20">
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20 text-destructive">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">Need help right now?</p>
              <p className="text-sm text-muted-foreground">Get instant guidance</p>
            </div>
          </div>
          <Button
            variant="gold"
            size="sm"
            onClick={() => setShowSituationHelper(true)}
          >
            Get Help
          </Button>
        </CardContent>
      </Card>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {!selectedCategory ? (
            // Category Grid
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredCategories.map((category) => (
                <RightsCategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </div>
          ) : (
            // Rights List
            <div className="space-y-4">
              {filteredRights?.map((right, index) => (
                <RightCard key={right.id} right={right} index={index} />
              ))}
              {filteredRights?.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No rights found matching your search.
                  </p>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:block space-y-6">
          {/* Quote Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-accent mb-4" />
              <p className="text-lg font-medium text-foreground italic leading-relaxed">
                "{quote}"
              </p>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://legalservices.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-secondary hover:underline"
                  >
                    National Legal Services Authority
                  </a>
                </li>
                <li>
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-secondary hover:underline"
                  >
                    Cybercrime Reporting Portal
                  </a>
                </li>
                <li>
                  <a
                    href="https://consumerhelpline.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-secondary hover:underline"
                  >
                    Consumer Helpline
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Emergency Numbers */}
          <Card className="border-destructive/20">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold text-foreground">Emergency Numbers</h3>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Police</span>
                  <span className="font-medium text-foreground">100</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Women Helpline</span>
                  <span className="font-medium text-foreground">181</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Cybercrime</span>
                  <span className="font-medium text-foreground">1930</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Child Helpline</span>
                  <span className="font-medium text-foreground">1098</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Situation Helper */}
      <SituationHelper
        open={showSituationHelper}
        onOpenChange={setShowSituationHelper}
      />
    </div>
  );
};

export default KnowYourRights;
