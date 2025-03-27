"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LineChart, MessageSquare, PenSquare, Search, Sparkles, X } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

type AIAssistantProps = {
  onClose?: () => void
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [inputText, setInputText] = useState("")

  const handleSelect = (task: string) => {
    setSelectedTask(task)

    // Pre-fill input text based on selected task
    switch (task) {
      case "property-description":
        setInputText("3 bedroom, 2 bathroom modern apartment with balcony in downtown area")
        break
      case "market-analysis":
        setInputText("Residential properties in Berlin, Germany")
        break
      case "email-draft":
        setInputText("Follow-up email to potential buyer who viewed the property yesterday")
        break
      default:
        setInputText("")
    }
  }

  const handleGenerate = () => {
    if (!selectedTask || !inputText.trim()) return

    setIsGenerating(true)

    // Simulate AI generation with different responses based on task
    setTimeout(() => {
      let generatedText = ""

      switch (selectedTask) {
        case "property-description":
          generatedText = `**Elegant Urban Living in the Heart of Downtown**

This stunning 3-bedroom, 2-bathroom modern apartment offers the perfect blend of sophistication and comfort. Featuring an open-concept design with abundant natural light, the living space flows seamlessly onto a private balcony with captivating city views.

The gourmet kitchen boasts premium stainless steel appliances, quartz countertops, and custom cabinetry. Each bedroom provides a tranquil retreat, with the primary suite offering a luxurious en-suite bathroom with rainfall shower.

Additional highlights include:
- Engineered hardwood flooring throughout
- Smart home technology
- In-unit laundry
- Secure building access with 24/7 concierge
- Walking distance to restaurants, shopping, and public transportation

This exceptional property combines modern urban living with comfort and convenience in a highly desirable downtown location.`
          break
        case "market-analysis":
          generatedText = `**Market Analysis: Residential Properties in Berlin, Germany**

The Berlin residential real estate market continues to show strong performance in 2023, with several key trends:

**Current Market Indicators:**
- Average price: €4,950/m² (up 3.2% year-over-year)
- Average rent: €13.50/m² (up 5.1% year-over-year)
- Average days on market: 62 (down from 78 last year)
- Inventory levels: 15% below 5-year average

**Neighborhood Performance:**
- Strongest growth: Friedrichshain-Kreuzberg (+7.1%)
- Highest average prices: Mitte (€6,200/m²)
- Emerging hotspot: Lichtenberg (showing 8.3% price growth)

**Buyer Demographics:**
- 35% first-time buyers
- 28% investors
- 22% upgrading to larger properties
- 15% downsizing

**Market Forecast:**
The Berlin market is projected to continue its upward trajectory with 4-5% annual price growth over the next 2-3 years, driven by limited supply and strong domestic and international demand.`
          break
        case "email-draft":
          generatedText = `Subject: Thank You for Visiting [Property Address] - Next Steps

Dear [Client Name],

I hope this email finds you well. I wanted to personally thank you for taking the time to view the property at [Property Address] yesterday. It was a pleasure showing you around, and I hope you found the tour informative and helpful in your home search journey.

Based on our conversation, I understand that you particularly appreciated the [specific feature they liked] but had some questions regarding the [area of concern]. I've gathered some additional information that might address your questions:

1. [Specific information point 1]
2. [Specific information point 2]
3. [Specific information point 3]

If you're interested in moving forward, I'd be happy to schedule a second viewing at your convenience. Alternatively, I have several similar properties that might also meet your criteria, which I'd be delighted to show you.

Please don't hesitate to reach out with any additional questions or concerns. I'm here to help make your property search as smooth and successful as possible.

Warm regards,

[Your Name]
[Your Title]
[Your Contact Information]`
          break
        case "search-answer":
          generatedText = `**Best practices for staging a property:**

1. **Declutter and depersonalize**
   - Remove personal photos and excessive decorations
   - Clear countertops and organize closets
   - Aim for a clean, minimal look that helps buyers envision themselves in the space

2. **Deep clean everything**
   - Professional carpet and upholstery cleaning
   - Windows, baseboards, and often-overlooked areas
   - Eliminate any odors (especially pet odors)

3. **Optimize furniture arrangement**
   - Create conversation areas in living spaces
   - Ensure easy traffic flow through rooms
   - Remove excess furniture to make spaces appear larger

4. **Enhance curb appeal**
   - Fresh paint on front door
   - Well-maintained landscaping
   - Clean walkways and exterior surfaces

5. **Use strategic lighting**
   - Maximize natural light by opening curtains/blinds
   - Update outdated light fixtures
   - Ensure all bulbs work and use consistent color temperature

6. **Add strategic accents**
   - Fresh flowers or plants
   - Neutral, coordinated throw pillows
   - New towels in bathrooms

7. **Address minor repairs**
   - Fix leaky faucets, loose handles, etc.
   - Touch up paint where needed
   - Replace cracked tiles or damaged flooring

8. **Consider professional staging**
   - Especially important for vacant properties
   - Can increase sale price by 1-5% on average
   - Particularly valuable for luxury properties`
          break
        default:
          generatedText = "I couldn't generate content for this task. Please try a different request."
      }

      setResult(generatedText)
      setIsGenerating(false)
    }, 2000)
  }

  const resetAssistant = () => {
    setSelectedTask(null)
    setInputText("")
    setResult(null)
  }

  const suggestions = [
    "Write a property description for a luxury villa",
    "Create a market analysis for downtown condos",
    "Draft an email to a potential buyer",
    "What are the best staging tips for selling quickly?",
    "Generate social media post for new listing",
  ]

  return (
    <div className="w-full">
      {!selectedTask ? (
        <>
          <div className="flex items-center border-b pb-4">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">RealtyPro AI Assistant</h2>
          </div>

          <div className="py-4">
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="Ask me anything about real estate..." value={query} onValueChange={setQuery} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggested Tasks">
                  <CommandItem onSelect={() => handleSelect("property-description")} className="flex items-center">
                    <PenSquare className="mr-2 h-4 w-4" />
                    <span>Generate property description</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSelect("market-analysis")} className="flex items-center">
                    <LineChart className="mr-2 h-4 w-4" />
                    <span>Create market analysis</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSelect("email-draft")} className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Draft client email</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSelect("search-answer")} className="flex items-center">
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search knowledge base</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Quick Suggestions">
                  {suggestions.map((suggestion, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        setQuery(suggestion)
                        if (suggestion.includes("property description")) {
                          handleSelect("property-description")
                        } else if (suggestion.includes("market analysis")) {
                          handleSelect("market-analysis")
                        } else if (suggestion.includes("email")) {
                          handleSelect("email-draft")
                        } else if (suggestion.includes("staging")) {
                          handleSelect("search-answer")
                        }
                      }}
                      className="flex items-center text-sm"
                    >
                      <span>{suggestion}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => handleSelect("property-description")}
            >
              Property Description
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => handleSelect("market-analysis")}
            >
              Market Analysis
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => handleSelect("email-draft")}
            >
              Email Template
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => handleSelect("search-answer")}
            >
              Staging Tips
            </Badge>
          </div>
        </>
      ) : (
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {selectedTask === "property-description" && <PenSquare className="mr-2 h-5 w-5 text-primary" />}
                {selectedTask === "market-analysis" && <LineChart className="mr-2 h-5 w-5 text-primary" />}
                {selectedTask === "email-draft" && <MessageSquare className="mr-2 h-5 w-5 text-primary" />}
                {selectedTask === "search-answer" && <Search className="mr-2 h-5 w-5 text-primary" />}
                <CardTitle className="text-lg">
                  {selectedTask === "property-description" && "Generate Property Description"}
                  {selectedTask === "market-analysis" && "Create Market Analysis"}
                  {selectedTask === "email-draft" && "Draft Client Email"}
                  {selectedTask === "search-answer" && "Staging Tips"}
                </CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={resetAssistant}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {selectedTask === "property-description" && "Describe your property:"}
                {selectedTask === "market-analysis" && "What market would you like to analyze?"}
                {selectedTask === "email-draft" && "What type of email do you need?"}
                {selectedTask === "search-answer" && "What would you like to know?"}
              </label>
              <Textarea
                placeholder="Enter details here..."
                className="min-h-[100px]"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            {result && (
              <div className="rounded-md border p-4 bg-muted/50">
                <div className="prose prose-sm max-w-none">
                  {result.split("\n\n").map((paragraph, i) => {
                    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                      // It's a heading
                      return (
                        <h3 key={i} className="font-bold text-base mt-3 mb-2">
                          {paragraph.replace(/\*\*/g, "")}
                        </h3>
                      )
                    } else if (paragraph.includes("- ")) {
                      // It's a list
                      return (
                        <ul key={i} className="list-disc pl-5 my-2">
                          {paragraph.split("\n").map((item, j) => (
                            <li key={j} className="my-1">
                              {item.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      )
                    } else if (paragraph.match(/^\d+\./)) {
                      // It's a numbered list
                      return (
                        <ol key={i} className="list-decimal pl-5 my-2">
                          {paragraph.split("\n").map((item, j) => {
                            const withoutNumber = item.replace(/^\d+\.\s*/, "")
                            return (
                              <li key={j} className="my-1">
                                {withoutNumber}
                              </li>
                            )
                          })}
                        </ol>
                      )
                    } else {
                      // Regular paragraph
                      return (
                        <p key={i} className="my-2">
                          {paragraph}
                        </p>
                      )
                    }
                  })}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="px-0 pt-2">
            <Button onClick={handleGenerate} disabled={isGenerating || !inputText.trim()} className="w-full">
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export function AIAssistantButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Sparkles className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">AI Assistant</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[450px] p-4" align="end">
          <AIAssistant onClose={() => setOpen(false)} />
        </PopoverContent>
      </Popover>

      <CommandDialog open={false}>
        <AIAssistant />
      </CommandDialog>
    </>
  )
}

