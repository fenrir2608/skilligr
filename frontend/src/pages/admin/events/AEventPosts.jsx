import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pencil, Trash2 } from 'lucide-react'
import { useAuth } from "../../../hooks/auth"
import Spinner from "../../../components/Spinner"
import { Link, useNavigate } from "react-router-dom"
import Sidebar from "../../../components/Sidebar"
import Header from "../../../components/Header"

export default function AdminEventPosts() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Workshop on React', description: 'Learn React basics', department: 'Computer Science', semester: '3rd', scheduledAt: '2023-06-15T10:00', endsAt: '2023-06-15T12:00', eventLink: 'https://example.com/react-workshop' },
    { id: 2, title: 'AI Seminar', description: 'Exploring AI trends', department: 'Artificial Intelligence', semester: '5th', scheduledAt: '2023-06-20T14:00', endsAt: '2023-06-20T16:00', eventLink: 'https://example.com/ai-seminar' },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted')
  }

  const handleUpdate = (id) => {
    // Handle update logic here
    console.log(`Update event with id: ${id}`)
  }

  const handleDelete = (id) => {
    // Handle delete logic here
    console.log(`Delete event with id: ${id}`)
  }
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) return <Spinner />;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

return (
    <div className="flex min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex flex-col flex-1 w-full">
            <Header onMenuClick={toggleSidebar} />
            <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4 space-y-8">
                <h1 className="text-2xl font-bold mb-4">Events Page</h1>

                {/* Event Creation Form */}
                <form onSubmit={handleSubmit} className="space-y-4 bg-background rounded-md px-7 py-7">
                    <h2 className="text-xl font-semibold">Create New Event</h2>
                    <Input placeholder="Event Title" required />
                    <Textarea placeholder="Event Description" required />
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cs">Computer Science</SelectItem>
                            <SelectItem value="ai">Artificial Intelligence</SelectItem>
                            <SelectItem value="me">Mechanical Engineering</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1st Semester</SelectItem>
                            <SelectItem value="2">2nd Semester</SelectItem>
                            <SelectItem value="3">3rd Semester</SelectItem>
                            <SelectItem value="4">4th Semester</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className='block w-fit'>
                        Schedule At
                    <Input className="bg-white text-black" type="datetime-local" placeholder="Scheduled At" required />
                    </div>
                    <div className='block w-fit'>
                        Ends At
                    <Input className="bg-white text-black" type="datetime-local" placeholder="Ends At" required />
                    </div>
                    <Input placeholder="Event Link" type="url" required />
                    <Button type="submit">Create Event</Button>
                </form>

                {/* Event List */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Events</h2>
                    {events.map((event) => (
                        <Card key={event.id} className="bg-background w-5/12 rounded-lg">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    {event.title}
                                    <div className="flex space-x-2">
                                        <Button size="icon" onClick={() => handleUpdate(event.id)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" onClick={() => handleDelete(event.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Description:</strong> {event.description}</p>
                                <p><strong>Department:</strong> {event.department}</p>
                                <p><strong>Semester:</strong> {event.semester}</p>
                                <p><strong>Scheduled At:</strong> {new Date(event.scheduledAt).toLocaleString()}</p>
                                <p><strong>Ends At:</strong> {new Date(event.endsAt).toLocaleString()}</p>
                                <p><strong>Event Link:</strong> <a href={event.eventLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{event.eventLink}</a></p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            </main>
        </div>
    </div>
)
}
