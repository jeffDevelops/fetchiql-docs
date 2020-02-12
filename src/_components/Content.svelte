<script>
  import Heading from './elements/Heading.svelte'
  import InlineCode from './elements/InlineCode.svelte'
  import Editor from './Editor.svelte'
  import { sideNavState } from '../_stores/sideNavState'
  import { get } from 'svelte/store'

  const handleClick = () => {
    if (get(sideNavState).mobileOpen) {
      sideNavState.set({
        desktop: false,
        mobileClosed: true,
        mobileOpen: false,
      })
    }
  }
</script>

<style>
  section {
    padding: 35px;
    width: 100%;
    max-width: 900px;
    height: 100%;
  }
  h3 {
    margin: 0;
    letter-spacing: .04em;
    
  }
  h2 {
    margin: 35px 0 15px 0;
    font-size: 1.4em;
    font-weight: 400;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover, a:hover * {
    text-decoration: none;
  }
</style>

<section on:click={handleClick}>
  <Heading>FetchiQL</Heading>
  <h3>A simple front end framework agnostic Fetch wrapper for GraphQL</h3>

  <a id="the_problem"><h2>The problem</h2></a>
  <p>
    Sending GraphQL requests without a GraphQL client like Apollo or Relay can be cumbersome, and if you're
    not using React, that's another story. FetchiQL allows you to send one-off GraphQL queries and mutations,
    as well as configure client instances you can pass around your application, so that all requests have
    the same configuration and headers.
  </p>

  <a id="how_it_works"><h2>How it works</h2></a>
  <p>
    FetchiQL exports either a standalone function wrapping Fetch you can use for one-off requests, or a
    <InlineCode>FetchiQLClient</InlineCode> class, which, excepting <InlineCode>method</InlineCode> which
    need only be <InlineCode>POST</InlineCode>, can be configured with the same properties as Fetch.
    Because GraphQL requests are always sent to the same endpoint, <InlineCode>FetchiQLClient</InlineCode>
    only needs to be pointed to that endpoint once.
  </p>

  <a id="getting_started"><Heading>Getting started</Heading></a>
  <h2>Installation</h2>
  <p>Install <InlineCode>fetchiql</InlineCode>:</p>

  <Editor
    id="install"
    initialContent={`npm i fetchiql`}
    readOnly
  />

  <p>For one-off requests, use the default export:</p>
  <Editor
    id="default_export"
    initialContent={`import fetchiQL from 'fetchiql'`}
    readOnly
  />

  <p>To use the same configuration for multiple requests in your application, use the
  <InlineCode>FetchiQLClient</InlineCode> named export:</p>
  <Editor
    id="named_export"
    initialContent={`import { FetchiQLClient } from 'fetchiql'`}
    readOnly
  />

  <a id="setup"><Heading>Setup</Heading></a>

  <h2>Define one or more GraphQL queries</h2>
  <p>
    Here, we're exporting a query for pet objects defined in a directory dedicated to
    defining GraphQL queries.
  </p>


  <Editor
    id="query_definition"
    readOnly
    initialContent={`// graphql/queries/pets.js
export default \`
  query pets($where: PetsWhereClause) {
    pets(where: $where) {
      id
      householdName
      binomialClassification
      givenName
      gender
      temperament
    }
  }
\``}
  />

  <h2>Define query variables</h2>
  <p>
    This is just a JavaScript object that gets stringified along with your query in the
    <InlineCode>POST</InlineCode> body. You may choose to include them as state in the
    file where you make the <InlineCode>fetchiQL</InlineCode> request, so that the user
    can choose how to filter, etc.
  </p>

    <Editor
      id="variables"
      readOnly
      initialContent={`// Pets.js
const variables = {
  where: {
    binomialClassification: {
      equals: ['Felis catus'],
    },
    givenName: {
      equals: ['Michael'],
    }
  }
}`}
    />

  <a id="make_a_one-off_request"><Heading>Make a one-off request</Heading></a>
  <p>
    Using the default export, which we've named <InlineCode>fetchiQL</InlineCode>, send
    a request:
  </p>

  <Editor
      id="one_off_request"
      readOnly
      initialContent={`// Pets.js
import fetchiQL from 'fetchiql'
import query from '../graphql/queries/pets'

const variables = {/* ... */}

fetchiQL('/graphql', query, variables)
  .then(data => console.log({ data }))
  .catch(errors => console.error({ errors })`}
  />
  
  <p>
    <InlineCode>fetchiQL</InlineCode> returns a <InlineCode>Promise</InlineCode> that either resolves a <InlineCode>data</InlineCode>
    object or rejects an array of error strings. Because GraphQL supports resolving multiple queries and mutations per request, the object
    accessor for the data you need for each query/mutation is its name.
  </p>
  <p>
    When <InlineCode>fetchiQL</InlineCode> rejects, it rolls up all of the errors returned from the GraphQL server into an array of strings.
  </p>

  <a id="make_lots_of_requests_with_one_config"><Heading>Make lots of requests with one config</Heading></a>
  <p>
    <InlineCode>fetchiQL</InlineCode> is great for one-off requests, but if your application needs to make tens, hundreds, or thousands of
    GraphQL network calls, you can configure a <InlineCode>FetchiQLClient</InlineCode> that'll dispatch GraphQL requests with the same
    configuration every time. For example, if your server requires requests to be authorized with a JSON Web Token in the headers, you'll
    want to configure a <InlineCode>FetchiQLClient</InlineCode> with that header, and use it to send requests throughout your app.
  </p>

  <h2>Configure a <InlineCode>FetchiQLClient</InlineCode> instance</h2>
  <Editor
    id="config"
    readOnly
    initialContent={`// config/fetchiql.config.js
import { FetchiQLClient } from 'fetchiql'

// Example
const token = sessionStorage.getItem('token');

export const fetchiQL = new FetchiQLClient('http://localhost:3000/api/graphql', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  },
})`}
  />

  <h2>Use the <InlineCode>FetchiQLClient</InlineCode>'s <InlineCode>send</InlineCode> method</h2>
  <p>
    Once that's configured, you can import it anywhere and call its <InlineCode>send</InlineCode> method. The <InlineCode>send</InlineCode>
    method does provide an escape hatch which allows you to provide a configuration override object. For example, maybe a signup or signin mutation
    must be fired in the event that no bearer token is available.
  </p>

    <Editor
    id=".send"
    readOnly
    initialContent={`// pets.js
import { fetchiQL } from '../config/fetchiql.config'
import query from '../graphql/queries/pets'

const variables = { /* ... */ }

const configOverrides = {
  headers: {
    Authorization: 'none needed', // override the authorization header from the config
    'Content-Type': 'application/json', // add an additional property not included in the config
}

fetchiQL.send(query, variables, configOverrides)
  .then(data => console.log({ data }))
  .catch(errors => console.error({ errors })`}
  />

  <a id="aborting_requests"><Heading>Aborting requests</Heading></a>
  <p>
    Sometimes, you need to be able to cancel a request. Like Fetch, FetchiQL is abortable. A parameter for an
    <InlineCode>AbortController</InlineCode> instance exists both for the one-off <InlineCode>fetchiQL</InlineCode>
    function and for <InlineCode>FetchiQLClient.send()</InlineCode>. Instantiate one and pass it in. Then, call
    that same <InlineCode>AbortController</InlineCode>'s <InlineCode>abort()</InlineCode> method wherever your
    framework has you do cleanup.
  </p>

  <Editor
    id="abort_controller"
    readOnly
    initialContent={`// Dogs.tsx
import React, { useEffect, useState } from 'react'
import PetDetail from './PetDetail'
import { fetchiQL } from 'fetchiql'
import { Pet } from '../types/interfaces/Pet'

const dogsQuery = \`
  query pets($where: PetsWhereClause) {
    pets(where: $where) {
      id
      householdName
      binomialClassification
      givenName
      gender
      temperament
    }
  }
\`

const dogVariables = {
  where: {
    binomialClassification: {
      equals: ['Canis lupus familiaris']
    },
    householdName: {
      equals: ['Dog', 'Puppy', 'Doggo', 'Pupperdoodle', 'Pup', 'Puppo', 'Borker', 'Pooch', 'Dorg', 'Doggie', 'Doge', 'Boofer', 'Woofer', 'Floof', 'Snooper']
    }
  }
}

const Dogs = () => {
  const [dogs, setDogs] = useState<Pet[]>([] as Pet[])

  useEffect(() => {
    // Instantiate an AbortController
    const abortController = new AbortController()

    // Pass the AbortController instance into fetchiQL
    fetchiQL('/api/graphql', query, dogVariables, abortController)
      .then(data => setDogs(data.dogs))
      .catch(errors => console.error(errors))
    
    // In React useEffect hooks, you can clean up your requests in an optionally returned function
    return () => abortController.abort()
  }, [fetchiQL])

  return (
    <>{dogs.map(dog => <PetDetail<Dog> pet={dog} />)}</>
  )
}`}
  />

  <a id="api_reference"><Heading>API Reference</Heading></a>

  <h2><InlineCode>fetchiQL</InlineCode> Function Signature</h2>
  <Editor
      id="function_signature"
      readOnly
      initialContent={`fetchiQL(
  /* Usually the URL to your GraphQL API, but an object implementing browser's Request interface may also be used, just like Window.fetch() */
  request: string | Request,
  
  /* Valid GraphQL string containing one or many queries/mutations */
  query: string,
  
  /* GraphQL query variables -- any $variables used in your GraphQL will need to be top-level key names in this object
  */
  variables: Object<any>,
  
  /* OPTIONAL: Fetch options, excluding method (always 'POST'), see FetchiQLOptions interface for more details */
  options?: FetchiQLOptions,
  
  /* OPTIONAL: FetchiQL is abortable, just like Fetch. Instantiate your own instance of the AbortController class and provide it for this argument. Then, when the time comes to abort the request (i.e., the containing component unrenders), call its .abort() method */
  abortController?: AbortController
): Promise<any | string[]>
  
/* fetchiQL returns a Promise. If the Promise resolves, you'll be able to access the data for each query/mutation by its name on the \`data\` object. If the Promise rejects, you'll receive an array of strings indicating everything that went wrong. */`}
  />

  <h2><InlineCode>FetchiQLClient.send()</InlineCode> Method Signature</h2>
  <Editor
      id="send_method_signature"
      readOnly
      initialContent={`export const fetchiql = new FetchiQLClient('http://myapi.tech/api/graphql', {
  headers: {
    Authorization: \`Bearer: \${token}\`
  }
})

fetchiql.send(
  /* Valid GraphQL string containing one or many queries/mutations */
  query: string,
  
  /* GraphQL query variables -- any $variables used in your GraphQL will need to be top-level key names in this object
  */
  variables: Object<any>,
  
  /* OPTIONAL: config override options, excluding method (always 'POST'), see FetchiQLOptions interface for more details */
  options?: Partial<FetchiQLOptions>,
  
  /* OPTIONAL: FetchiQL is abortable, just like Fetch. Instantiate your own instance of the AbortController class and provide it for this argument. Then, when the time comes to abort the request (i.e., the containing component unrenders), call its .abort() method */
  abortController?: AbortController
): Promise<any | string[]>
  
/* FetchiQLClient.send() returns a Promise. If the Promise resolves, you'll be able to access the data for each query/mutation by its name on the \`data\` object. If the Promise rejects, you'll receive an array of strings indicating everything that went wrong. */`}
  />

  <h2>interface <InlineCode>FetchiQLOptions</InlineCode></h2>
  <p>
    The <InlineCode>FetchiQLClient</InlineCode> implements the <InlineCode>FetchiQLOptions</InlineCode> interface. The constructor overrides Fetch defaults upon instantiation. Partials can be provided in the constructor, in overrides within the <InlineCode>send()</InlineCode>
    method, or in one-off calls of the default export. For each of the properties listed below, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">Fetch defaults</a> are listed first.
  </p>
  <Editor
      id="interface"
      readOnly
      initialContent={`interface FetchiQLOptions {
  mode?: "cors" | "no-cors" | "same-origin";
  cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached";
  credentials?: "same-origin" | "include" | "omit";
  headers?: {
    [key: string]: string;
  };
  redirect?: "follow" | "manual" | "error";
  referrerPolicy?:
    | ""
    | "same-origin"
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "strict-origin"
    | "origin-when-cross-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
}`}
  />
  
</section>