import {Link} from "react-router-dom"
import { ArrowRight } from  "lucide-react"

export default function EventPosts() {
  const events = [
    {
      id: 1,
      title: "Trivia Night",
      description: "Test your knowledge at our weekly trivia event!",
      type: "Quiz",
      date: "April 15, 2023",
      time: "7:00 PM",
      location: "Main Hall",
    },
    {
      id: 2,
      title: "Book Club Meeting",
      description: "Discuss the latest novel with fellow book lovers.",
      type: "Club Event",
      date: "May 5, 2023",
      time: "6:30 PM",
      location: "Library",
    },
    {
      id: 3,
      title: "Painting Workshop",
      description: "Learn new techniques and create your own masterpiece.",
      type: "Workshop",
      date: "June 10, 2023",
      time: "2:00 PM",
      location: "Art Studio",
    },
    {
      id: 4,
      title: "Outdoor Adventure Club",
      description: "Join us for a hike through the local nature reserve.",
      type: "Club Event",
      date: "July 20, 2023",
      time: "10:00 AM",
      location: "Trailhead",
    },
    {
      id: 5,
      title: "Cooking Class",
      description: "Master new recipes and techniques in our hands-on class.",
      type: "Workshop",
      date: "August 2, 2023",
      time: "6:00 PM",
      location: "Culinary Center",
    },
    {
      id: 6,
      title: "Movie Screening",
      description: "Enjoy a classic film on the big screen.",
      type: "Club Event",
      date: "September 15, 2023",
      time: "8:00 PM",
      location: "Auditorium",
    },
  ]
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">Upcoming Events</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <Link
              key={event.id}
              href="#"
              className="group relative block overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              prefetch={false}
            >
              <div className="absolute inset-0 z-10">
                <span className="sr-only">View event details</span>
              </div>
              <div className="bg-background p-4">
                <h3 className="mb-2 text-lg font-bold">{event.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                    {event.type}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

