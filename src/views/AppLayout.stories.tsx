import { useState } from 'react'
import { ComponentStory } from '@storybook/react'

import Button from './Button'
import AppLayout from './AppLayout'

export default {
  title: 'App Layout',
  component: AppLayout,
}

const Template: ComponentStory<typeof AppLayout> = (args) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <AppLayout
      isNavOpen={isNavOpen}
      navChildren={
        <div>
          <h3>
            <strong>Nav area of layout</strong>
          </h3>
          <p>
            <Button onClick={() => setIsNavOpen(false)}>Close nav</Button>
          </p>
        </div>
      }
    >
      <div>
        <h1>Body of the layout</h1>
        <p>
          <Button onClick={() => setIsNavOpen(true)}>Open nav</Button>
        </p>

        <p>
          Bacon ipsum dolor amet turkey jerky meatloaf flank, pork belly
          hamburger boudin ham strip steak bacon chuck doner pastrami. Strip
          steak cow buffalo ground round, swine jowl pork chislic tail ham hock
          pancetta beef pork chop pork loin tri-tip. Ham hock beef ribs sirloin
          prosciutto turkey pork. Ham hock pork fatback pastrami. Prosciutto
          tri-tip t-bone bacon. Shankle porchetta bresaola corned beef pancetta.
          Pork loin picanha spare ribs, boudin shank pig chuck alcatra biltong.
        </p>

        <p>
          Short ribs boudin sausage, pastrami pancetta beef shoulder burgdoggen
          short loin rump venison strip steak tenderloin. Boudin salami pork
          loin, ball tip flank strip steak pork belly brisket. Turkey chicken
          kevin ham hock. Frankfurter biltong pork belly burgdoggen filet
          mignon, cow shank swine strip steak turducken buffalo porchetta
          chislic. Hamburger t-bone chislic ribeye spare ribs turducken boudin
          sirloin picanha kevin beef meatloaf swine flank corned beef. Bacon
          spare ribs alcatra pastrami, biltong jowl andouille bresaola swine
          filet mignon boudin kielbasa ground round doner capicola.
        </p>

        <p>
          Corned beef chuck spare ribs pig. Strip steak picanha fatback tri-tip
          alcatra meatloaf. Sirloin shoulder hamburger alcatra. Pig venison
          brisket, porchetta pork loin pork belly rump tongue capicola
          burgdoggen filet mignon tri-tip. Ribeye shoulder salami, drumstick
          boudin flank venison tri-tip corned beef.
        </p>

        <p>
          Filet mignon pancetta burgdoggen ground round meatloaf jowl drumstick
          pork belly beef. Cow swine bresaola, buffalo jerky chislic ham
          meatball strip steak pancetta alcatra landjaeger ribeye kielbasa. Ball
          tip porchetta pork shank fatback chuck. Beef ribs pork loin shoulder
          meatloaf spare ribs shank bacon leberkas chislic pork chop biltong.
          Pancetta jerky venison sausage short ribs, spare ribs cow rump
          meatloaf turducken tongue. Picanha ribeye shank chislic t-bone beef
          tail. Drumstick beef ribs capicola jerky bresaola landjaeger cupim
          flank shoulder.
        </p>

        <p>
          Frankfurter pig porchetta kielbasa strip steak pork chop brisket ham
          pork buffalo chislic chicken biltong ball tip turkey. Beef ribs swine
          filet mignon sirloin, meatball doner capicola kevin porchetta tail.
          Ribeye boudin alcatra brisket short loin hamburger. Biltong hamburger
          chuck pork loin burgdoggen spare ribs strip steak beef ribs rump
          capicola prosciutto short ribs beef tenderloin. Prosciutto ribeye
          bacon ham hock pork chop rump. Shoulder hamburger jowl turkey.
        </p>

        <p>
          Cupim boudin pork chop drumstick corned beef biltong. Capicola kevin
          landjaeger corned beef doner turducken rump sirloin meatball meatloaf
          picanha tri-tip. Ball tip turkey ground round, venison shoulder
          porchetta rump. Shankle cupim chicken alcatra.
        </p>

        <p>
          Pig beef pastrami venison pork loin turkey porchetta rump tongue
          biltong drumstick. Swine short ribs fatback buffalo, jowl chuck
          drumstick rump. Flank chicken burgdoggen ground round venison ham hock
          tongue picanha kielbasa pork loin fatback shoulder chuck brisket strip
          steak. Strip steak corned beef frankfurter sausage shank shoulder ball
          tip meatloaf tenderloin. Bresaola landjaeger tri-tip, turkey meatball
          ham frankfurter ball tip filet mignon pork belly sausage ground round.
          Fatback turducken corned beef cow, pork alcatra bresaola pig shank.
          Meatball fatback ham hock shankle, drumstick jowl ham short loin filet
          mignon strip steak bacon.
        </p>

        <p>
          Flank porchetta meatball beef venison, swine spare ribs pig short ribs
          rump short loin ham hock pork leberkas. Short loin meatball shankle
          flank, salami beef ribs porchetta turkey boudin shank bresaola
          prosciutto pork belly. Jerky ham pancetta, pork chicken salami tri-tip
          capicola prosciutto cupim meatloaf kielbasa. Chislic swine cow boudin
          short ribs. Chicken burgdoggen turkey pork shankle kielbasa hamburger
          landjaeger.
        </p>
      </div>
    </AppLayout>
  )
}

export const appLayout = Template.bind({})
