/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kLnTJb68fq2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function JobDetails() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src="/placeholder.svg"
            alt="Job Posting"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
            style={{ aspectRatio: "800/600", objectFit: "cover" }}
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Software Engineer</h1>
            <p className="text-muted-foreground">San Francisco, CA</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Job Description</h2>
            <p className="text-muted-foreground">
              We are seeking a talented and experienced Software Engineer to join our growing team. In this role, you
              will be responsible for designing, developing, and maintaining our web applications and services. You will
              work closely with our product and design teams to deliver high-quality, user-friendly software.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Requirements</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Bachelor's degree in Computer Science or a related field</li>
              <li>
                5+ years of experience in software development, with a strong background in JavaScript, React, and
                Node.js
              </li>
              <li>Proficient in writing clean, maintainable, and well-documented code</li>
              <li>Experience with modern web development tools and best practices</li>
              <li>
                Strong problem-solving and analytical skills, with the ability to work independently and as part of a
                team
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Compensation</h2>
            <p className="text-muted-foreground">$80,000 - $120,000 per year, plus benefits</p>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  )
}