import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "../../../hooks/auth"
import Spinner from "../../../components/Spinner"
import { Link, useNavigate } from "react-router-dom"
import Sidebar from "../../../components/Sidebar"
import Header from "../../../components/Header"

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, label: 'Workshop on React', description: 'Learn React basics', department: 'Computer Science', semester: '3rd'},
  ])
  const [formData, setFormData] = useState({
    label: '',
    description: '',
    department: '',
    semester: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNotifications(prevNotifications => [...prevNotifications, { ...formData, id: Date.now() }])
    setFormData({ label: '', description: '', department: '', semester: '' })
  }

  const handleDelete = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id))
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
            <div className="container mx-auto p-4 space-y-8">
                <h1 className="text-2xl font-bold mb-4">Notifications Management</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Create New Notification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="label">Label</Label>
                                    <Input
                                        id="label"
                                        name="label"
                                        value={formData.label}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Select name="department" onValueChange={(value) => handleSelectChange('department', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cs">Computer Science</SelectItem>
                                            <SelectItem value="ee">Electrical Engineering</SelectItem>
                                            <SelectItem value="me">Mechanical Engineering</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="semester">Semester</Label>
                                <Select name="semester" onValueChange={(value) => handleSelectChange('semester', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fall2023">Fall 2023</SelectItem>
                                        <SelectItem value="spring2024">Spring 2024</SelectItem>
                                        <SelectItem value="summer2024">Summer 2024</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit">Create Notification</Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Current Notifications</h2>
                    {notifications.map(notification => (
                        <Card key={notification.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {notification.label}
                                </CardTitle>
                                <Button
                                    size="icon"
                                    onClick={() => handleDelete(notification.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete notification</span>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground mb-2">
                                    {notification.department} - {notification.semester}
                                </p>
                                <p className="text-sm">{notification.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
}