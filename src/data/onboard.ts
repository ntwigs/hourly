interface OnBoard {
  image: string
  title: string
  text: string
}

export const onboard: OnBoard[] = [
  {
    image: '',
    title: 'Welcome',
    text: "I'll take you on a very *short journey* to make sure you know everything you need know in order to use *Hourly*.",
  },
  {
    image: '',
    title: 'Toggl',
    text: "Before you begin - this extension currently only works for the time tracking software *Toggl*. So start using that if you're not already!",
  },
  {
    image: '',
    title: 'Hourly rate',
    text: "First you'll have to enter your *hourly rate*. How much you'd *make per hour*.",
  },
  {
    image: '',
    title: 'Beers?',
    text: 'Then you should *select an item* that you would like to be *represented* on your Toggl page.',
  },
  {
    image: '',
    title: 'Dough',
    text: 'Does the *price* not add up to the actual item your saving for? *Change it*!',
  },
]
