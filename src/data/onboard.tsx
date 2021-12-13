interface OnBoard {
  component?: 'rate' | 'cost' | 'items'
  title: string
  text: string
}

export const onboard: OnBoard[] = [
  {
    title: 'Welcome',
    text: "I'll take you on a short trip around *Hourly-town*, so you'll know everything you need to get *started*!",
  },
  {
    title: 'Toggl',
    text: "Before you begin - this extension currently only works for the time tracking software *Toggl*. So start using that if you're not already!",
  },
  {
    component: 'rate',
    title: 'Hourly rate',
    text: "First, you'll have to enter your *hourly rate*, how much you make per hour. Don't worry - *Hourly doesn't snoop*.",
  },
  {
    component: 'items',
    title: 'Beers?',
    text: "So you'd like to *show some beers* on your Toggl? I've got your back Jack! You get right to it and click that *beer button*.",
  },
  {
    component: 'cost',
    title: 'Dough',
    text: 'Whoa! That *cookie* is way more *expensive* than the one you want. Good news! The price is *customizable*.',
  },
]
