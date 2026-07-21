'use client';

import { useActionState } from 'react';
import { VStack } from '@chakra-ui/react';
import { updateHero, type ActionResult } from '@/app/admin/actions';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { FormField, EditorField } from '@/components/admin/FormField';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { SaveBar } from '@/components/admin/SaveBar';
import type { HeroContent } from '@/lib/types';

export function HeroForm({ hero }: { hero: HeroContent }) {
  const [result, formAction] = useActionState<ActionResult | null, FormData>(
    updateHero,
    null
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={hero.id} />

      <VStack align="stretch" gap="6">
        <EditorField
          label="Greeting"
          hint={`The small line above the headline - e.g. "Hi, I'm Madeline".`}
        >
          <RichTextEditor
            name="greeting"
            defaultValue={hero.greeting}
            variant="minimal"
            minH="60px"
          />
        </EditorField>

        <EditorField
          label="Headline"
          hint="The big opening statement, directly under the greeting."
        >
          <RichTextEditor
            name="title"
            defaultValue={hero.title}
            variant="minimal"
            minH="70px"
          />
        </EditorField>

        <EditorField
          label="Headline continuation"
          hint="Runs straight on from the headline, on the same line, in coral."
        >
          <RichTextEditor
            name="subtitle"
            defaultValue={hero.subtitle}
            variant="minimal"
            minH="70px"
          />
        </EditorField>

        <EditorField label="Intro paragraph">
          <RichTextEditor
            name="description"
            defaultValue={hero.description}
            minH="120px"
          />
        </EditorField>

        <FormField
          label="Button text"
          name="cta_text"
          defaultValue={hero.cta_text}
          placeholder="See My Work"
        />
        <FormField
          label="Button link"
          name="cta_link"
          defaultValue={hero.cta_link}
          placeholder="#projects"
          hint="Use #projects or #contact to scroll to a section, or a full URL."
        />

        <ImageUploader
          label="Profile photo"
          name="profile_image"
          folder="hero"
          defaultValue={hero.profile_image}
          hint="Shown in the sidebar and mobile menu."
        />

        <ImageUploader
          label="Background image"
          name="background_image"
          folder="hero"
          defaultValue={hero.background_image}
        />

        <SaveBar result={result} />
      </VStack>
    </form>
  );
}
