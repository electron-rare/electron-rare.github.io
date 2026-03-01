import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <h3 style={{ marginTop: 0 }}>Card title</h3>
      <p style={{ marginBottom: 0 }}>A reusable studio card with border, depth, and spacing rhythm.</p>
    </Card>
  )
};
