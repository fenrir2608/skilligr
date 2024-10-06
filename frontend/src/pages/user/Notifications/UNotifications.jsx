import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useAuth } from "../../../hooks/auth";

export default function UNotifications() {
  const { authStatus, loading } = useAuth();
  if (loading) return <Spinner/>;
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search notifications..." className="pl-10 w-full" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="newest">
                <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="label">Label</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="font-medium">Admin</div>
            </div>
            <Badge variant="secondary" className="text-xs">
              Announcement
            </Badge>
          </CardHeader>
          <CardContent>
            <p>
              We are excited to announce the launch of our new product feature! Check it out and let us know what you
              think.
            </p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">2 hours ago</CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="font-medium">Admin</div>
            </div>
            <Badge className="text-xs">Update</Badge>
          </CardHeader>
          <CardContent>
            <p>We have just released a new update to our platform. Check out the changelog for more details.</p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">1 day ago</CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="font-medium">Admin</div>
            </div>
            <Badge variant="success" className="text-xs">
              Feature
            </Badge>
          </CardHeader>
          <CardContent>
            <p>
              We have just added a new feature to our platform that allows you to do X. Check it out and let us know
              what you think.
            </p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">3 days ago</CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="font-medium">Admin</div>
            </div>
            <Badge variant="danger" className="text-xs">
              Outage
            </Badge>
          </CardHeader>
          <CardContent>
            <p>
              We are currently experiencing an outage on our platform. We are working to resolve the issue as soon as
              possible.
            </p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">1 week ago</CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="font-medium">Admin</div>
            </div>
            <Badge variant="warning" className="text-xs">
              Maintenance
            </Badge>
          </CardHeader>
          <CardContent>
            <p>
              We will be performing scheduled maintenance on our platform this weekend. Please expect some downtime
              during this time.
            </p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">2 weeks ago</CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="font-medium">Admin</div>
            </div>
            <Badge variant="info" className="text-xs">
              Release
            </Badge>
          </CardHeader>
          <CardContent>
            <p>We have just released a new version of our platform. Check out the changelog for more details.</p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">1 month ago</CardFooter>
        </Card>
      </div>
    </div>
  )
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}