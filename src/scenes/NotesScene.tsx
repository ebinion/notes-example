// NOTE: file is largely commented out for refactoring work.
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentUser, signOut } from '../store/currentUserStore'
import { AppDispatch } from '../store'

// import AppLayout from '../views/AppLayout'
// import Avatar from '../views/Avatar'
import Button from '../views/Button'
// import Header from '../views/Header'
// import IconedButton from '../views/IconedButton'
// import Menu from '../views/Menu'
// import Note from '../views/Note'
// import { ReactComponent as PlusIcon } from '../icons/plus-solid.svg'
// import Teaser from '../views/Teaser'
// import Toolbar from '../views/Toolbar'
// import VStack from '../views/VStack'
// import { signOut } from '../store/currentUserActions'

const NotesScene: FC = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <h1>Hi, {currentUser?.name}</h1>
      <Button onClick={() => dispatch(signOut())}>Logout</Button>
    </div>
  )

  // return (
  //   <AppLayout
  //     isNavOpen={isNavOpen}
  //     navChildren={
  //       <>
  //         <Header isSticky role="banner">
  //           <Toolbar
  //             leadingChildren={
  //               <Menu
  //                 trigger={
  //                   <Avatar
  //                     name={
  //                       currentUser && currentUser.name
  //                         ? currentUser.name
  //                         : undefined
  //                     }
  //                   />
  //                 }
  //               >
  //                 <VStack>
  //                   <div className="text--s text--light">
  //                     {currentUser?.name && `Hi, ${currentUser.name}`}
  //                   </div>
  //                   <Button
  //                     isAlignedLeading
  //                     isFullWidth
  //                     onClick={() => signOut(currentUserDispatch)}
  //                     size="s"
  //                     type="secondary"
  //                   >
  //                     Sign Out
  //                   </Button>
  //                 </VStack>
  //               </Menu>
  //             }
  //             trailingChildren={
  //               <IconedButton onClick={handleNewNote}>
  //                 <PlusIcon />
  //               </IconedButton>
  //             }
  //           >
  //             <h1 className="h4 text--light">Notes</h1>
  //           </Toolbar>
  //         </Header>

  //         <VStack gap="xs" hasOutterGutter>
  //           {selectNotes().map((note) => {
  //             return (
  //               <Teaser
  //                 isActive={note.id === currentNoteID}
  //                 title={note.title}
  //                 date={note.lastModifiedDate}
  //                 onClick={(event) => handleSetCurrentNote(note, event)}
  //                 key={note.id}
  //               />
  //             )
  //           })}
  //         </VStack>
  //       </>
  //     }
  //   >
  //     <Note
  //       data={selectNote()}
  //       updateNote={updateNote}
  //       toggleIsNavOpen={toggleIsNavOpen}
  //     />
  //   </AppLayout>
  // )
}

export default NotesScene
