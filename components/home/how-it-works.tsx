import { CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Create or Join a Group',
    description: 'Start a new group or join existing ones based on your interests and goals.',
  },
  {
    number: '02',
    title: 'Set Up Projects',
    description: 'Organize your work into projects with clear objectives and timelines.',
  },
  {
    number: '03',
    title: 'Collaborate in Real-time',
    description: 'Chat, share files, and work together using our collaborative tools.',
  },
  {
    number: '04',
    title: 'Track Progress',
    description: 'Monitor project progress and celebrate milestones with your team.',
  },
]

export default function HowItWorks() {
  return (
    <div className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started with PeerCollab in four simple steps
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground text-lg font-bold">
                  {step.number}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold">Ready to Collaborate?</h3>
              <p className="mt-4 text-muted-foreground">
                Join thousands of peers who are already collaborating, learning, and growing together.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'No credit card required',
                  'Free plan available',
                  'Cancel anytime',
                  '24/7 support',
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
              <div className="text-center">
                <div className="text-4xl font-bold">0+</div>
                <div className="text-lg font-medium mt-2">Active Groups</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Join our growing community
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
