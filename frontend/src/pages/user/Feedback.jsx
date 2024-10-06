import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function Feedback() {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Feedback</h1>
        <p className="text-muted-foreground">
          We value your feedback! Please let us know how we can improve the Skilligr experience.
        </p>
      </div>
      <form className="mt-8 space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Feedback Title</Label>
            <Input id="title" placeholder="Enter a title for your feedback" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea id="feedback" placeholder="Share your thoughts and suggestions" className="min-h-[150px]" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="anonymous" />
            <Label htmlFor="anonymous" className="text-sm">
              Submit feedback anonymously
            </Label>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>
    </div>
  )
}