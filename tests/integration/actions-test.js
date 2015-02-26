/* global QUnit*/

import { w } from '../support/utils';
import { compilesTo } from '../support/integration-assertions';

QUnit.module("actions");

test("basic (click)", function(){
  var emblem = 'button click="submitComment" Submit Comment';
  compilesTo(emblem, '<button {{action "submitComment" on="click"}}>Submit Comment</button>');
});

test("basic (click) followed by attr", function(){
  var emblem = 'button click="submitComment" class="foo" Submit Comment';
  compilesTo(emblem, '<button {{action "submitComment" on="click"}} class="foo">Submit Comment</button>');

  emblem = 'button click="submitComment \'omg\'" class="foo" Submit Comment';
  compilesTo(emblem, '<button {{action "submitComment" \'omg\' on="click"}} class="foo">Submit Comment</button>');
});

test("nested (mouseEnter)", function(){
  var emblem = w(
    "a mouseEnter='submitComment target=view'",
    "  | Submit Comment"
  );
  compilesTo(emblem, '<a {{action "submitComment" target=view on="mouseEnter"}}>Submit Comment</a>');
});

test("nested (mouseEnter, singlequoted)", function(){
  var emblem = w(
    "a mouseEnter='submitComment target=\"view\"'",
    "  | Submit Comment"
  );
  compilesTo(emblem, '<a {{action "submitComment" target="view" on="mouseEnter"}}>Submit Comment</a>');
});

test("nested (mouseEnter, doublequoted)", function(){
  var emblem = w(
    "a mouseEnter=\"submitComment target='view'\"",
    "  | Submit Comment"
  );
  compilesTo(emblem, '<a {{action "submitComment" target=\'view\' on="mouseEnter"}}>Submit Comment</a>');
});

test("manual", function(){
  var emblem = "a{action someBoundAction target=view} Submit Comment";
  compilesTo(emblem, '<a {{action someBoundAction target=view}}>Submit Comment</a>');
});

test("manual nested", function(){
  var emblem = w(
    "a{action 'submitComment' target=view}",
    "  p Submit Comment"
  );
  compilesTo(emblem, '<a {{action \'submitComment\' target=view}}><p>Submit Comment</p></a>');
});

test("single quote test", function() {
  var emblem;
  emblem = "button click='p' Frank";
  compilesTo(emblem, '<button {{action "p" on="click"}}>Frank</button>');
});

test("double quote test", function() {
  var emblem;
  emblem = "button click=\"p\" Frank";
  compilesTo(emblem, '<button {{action "p" on="click"}}>Frank</button>');
});

// FIXME -- fails. Should this be {{action p}} or {{action "p"}} ?
/*
test("no quote test", function() {
  var emblem;
  emblem = "button click=p Frank";
  compilesTo(emblem, '<button {{action p on="click"}}>Frank</button>');
});
*/
